import { Injectable } from '@nestjs/common';
import { UserRequest } from './dto/user.create.dto';
import { UserRequestUpdate } from './dto/user.update.dto';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from './entities/mappers/user.mapper';
import { orderByFormat } from '../shared/utils/orderby-format';
import { RoleRepository } from '../role/repository/role.repository';
import {
  encryptPassword,
  generatePassword,
} from '../shared/utils/passwordGenerator';
import { randomInt } from 'crypto';
import { EventsService } from '../kafka/events.service';
import {
  USER_CREATED,
  USER_DELETED,
  USER_STATUS_CHANGED,
} from '../kafka/events';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly kafkaService: EventsService,
  ) {}

  async create(createUserDto: UserRequest, tenantId: string) {
    const role = await this.roleRepository.findOne(
      createUserDto.role_id,
      tenantId,
    );
    if (!role) {
      throw new Error('Rol no encontrado');
    }

    const password = generatePassword(randomInt(20, 30));
    createUserDto.password = await encryptPassword(password);
    const res = await this.repository.create(
      UserMapper.toEntity({ ...createUserDto }),
      tenantId,
    );
    const dto = UserMapper.toResponse(res);
    this.kafkaService.sendMessage(USER_CREATED, JSON.stringify(dto));
    return dto;
  }

  async findAll(tenantId: string) {
    const res = await this.repository.findAll(tenantId);
    return res.map((user) => UserMapper.toResponse(user));
  }

  async findByEmail(email: string, tenantId: string) {
    const res = await this.repository.findByEmail(email, tenantId);
    return res || null;
  }

  async findMany(
    tenantId: string,
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string[],
  ) {
    const res = await this.repository.findMany({
      page,
      perPage,
      orderBy: {
        address: orderByFormat(orderBy, 'address'),
        email: orderByFormat(orderBy, 'email'),
        first_name: orderByFormat(orderBy, 'first_name'),
        phone: orderByFormat(orderBy, 'phone'),
        id: orderByFormat(orderBy, 'id'),
        createdAt: orderByFormat(orderBy, 'createdAt'),
      },
      where: search
        ? {
            AND: [
              { tenantId },
              {
                OR: [
                  { last_name: { contains: search } },
                  { email: { contains: search } },
                  { first_name: { contains: search } },
                  { address: { contains: search } },
                ],
              },
            ],
          }
        : {
            AND: [{ tenantId }, { deleted: false }],
          },
      include: {
        role: true,
      },
    });

    return {
      data: res.data.map((user) => UserMapper.toResponseInclude(user)),
      meta: res.meta,
    };
  }

  async findOne(id: number, tenantId: string) {
    const res = await this.repository.findOne(id, tenantId);
    return UserMapper.toResponse(res);
  }

  async update(id: number, updateUserDto: UserRequestUpdate, tenantId: string) {
    const res = await this.repository.update(
      id,
      tenantId,
      UserMapper.toEntityUpdate({ ...updateUserDto }),
    );
    const dto = UserMapper.toResponse(res);
    this.kafkaService.sendMessage(USER_STATUS_CHANGED, JSON.stringify(dto));
    return dto;
  }

  async remove(id: number, tenantId: string) {
    const res = await this.repository.remove(id, tenantId);
    const dto = UserMapper.toResponse(res);
    this.kafkaService.sendMessage(USER_DELETED, JSON.stringify(dto));
    return dto;
  }
}
