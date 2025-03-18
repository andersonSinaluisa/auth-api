import { Injectable } from '@nestjs/common';
import { UserRequest } from './dto/user.create.dto';
import { UserRequestUpdate } from './dto/user.update.dto';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from './entities/mappers/user.mapper';
import { orderByFormat } from 'src/shared/utils/orderby-format';
import { RoleRepository } from 'src/role/repository/role.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) { }
  async create(createUserDto: UserRequest) {
    const role = await this.roleRepository.findOne(createUserDto.role_id);
    if (!role) {
      throw new Error('Rol No encontrado');
    }

    const res = await this.repository.create(
      UserMapper.toEntity(createUserDto),
    );
    return UserMapper.toResponse(res);
  }

  async findAll() {
    const res = await this.repository.findAll();
    return res.map((user) => UserMapper.toResponse(user));
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
      where: {
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
      },
    });
    return {
      data: res.data.map((user) => UserMapper.toResponse(user)),
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
    return UserMapper.toResponse(res);
  }

  async remove(id: number) {
    const res = await this.repository.remove(id);
    return UserMapper.toResponse(res);
  }
}
