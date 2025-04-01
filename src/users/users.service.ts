import { Injectable } from '@nestjs/common';
import { UserRequest } from './dto/user.create.dto';
import { UserRequestUpdate } from './dto/user.update.dto';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from './entities/mappers/user.mapper';
import { orderByFormat } from 'src/shared/utils/orderby-format';
import { RoleRepository } from 'src/role/repository/role.repository';
import { encryptPassword, generatePassword } from 'src/shared/utils/passwordGenerator';
import { hash, randomInt } from 'crypto';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { EventsService } from 'src/kafka/events.service';
import { USER_CREATED, USER_DELETED, USER_STATUS_CHANGED } from 'src/kafka/events';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly kafkaService: EventsService,
  ) { }
  async create(createUserDto: UserRequest) {
    const role = await this.roleRepository.findOne(createUserDto.role_id);
    if (!role) {
      throw new Error('Rol No encontrado');
    }
    const password = generatePassword(randomInt(20, 30));
    console.log(password)
    createUserDto.password = await encryptPassword(password);
    const res = await this.repository.create(
      UserMapper.toEntity(createUserDto),
    );
    const dto = UserMapper.toResponse(res);
    this.kafkaService.sendMessage(USER_CREATED, JSON.stringify(dto));
    return dto
  }

  async findAll() {
    const res = await this.repository.findAll();
    return res.map((user) => UserMapper.toResponse(user));
  }

  async findByEmail(email: string) {

    const res = await this.repository.findByEmail(email);
    if (!res) {
      return null;
    }
    return res;
  }

  async findMany(
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
      where:search? {
        OR: [
          {
            last_name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
          {
            first_name: {
              contains: search,
            },
          },
          {
            address: {
              contains: search,
            },
          },
        ],
      }:{
        AND: {
          deleted: false,
        },
      },
      include:{
        role: true,
      }
    });
    return {
      data: res.data.map((user) => UserMapper.toResponseInclude(user)),
      meta: res.meta,
    };
  }

  async findOne(id: number) {
    const res = await this.repository.findOne(id);
    return UserMapper.toResponse(res);
  }

  async update(id: number, updateUserDto: UserRequestUpdate) {
    const res = await this.repository.update(
      id,
      UserMapper.toEntityUpdate(updateUserDto),
    );
    const dto = UserMapper.toResponse(res);
    this.kafkaService.sendMessage(USER_STATUS_CHANGED, JSON.stringify(dto));
    return dto;

  }

  async remove(id: number) {
    const res = await this.repository.remove(id);
    const dto   = UserMapper.toResponse(res);
    this.kafkaService.sendMessage(USER_DELETED, JSON.stringify(dto));
    return dto;
  }
}
