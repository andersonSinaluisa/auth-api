import { Prisma, User } from '@prisma/client';
import { UserRequest } from '../../dto/user.create.dto';
import { UserResponseDto } from '../../../users/dto/user.read.dto';
import { DefaultArgs } from '@prisma/client/runtime/library';

export class UserMapper {
  static toEntity(user: UserRequest): Prisma.UserUncheckedCreateInput {
    return {
      address: user.address,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      password: user.password,
      role_id: user.role_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static toResponse(user: User): UserResponseDto {
    return {
      address: user.address,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      created_at: user.createdAt,
      id: user.id,
      updated_at: user.updatedAt,
      role_id: user.role_id,
    } as UserResponseDto;
  }

  static toResponseInclude(user: any) {
    return {
      address: user.address,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      created_at: user.createdAt,
      id: user.id,
      updated_at: user.updatedAt,
      role_id: user.role_id,
      is_active: user.is_active,
      role: {
        createdAt: user.role instanceof Object ? user.role.createdAt : null,
        id: user.role instanceof Object ? user.role.id : null,
        name: user.role instanceof Object ? user.role.name : null,
        permissions: user.role instanceof Object ? user.role.permissions : null,
        updatedAt: user.role instanceof Object ? user.role.updatedAt : null,
      },
    };
  }

  static toEntityUpdate(user: UserRequest): Prisma.UserUncheckedUpdateInput {
    return {
      address: user.address,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      password: user.password,
      role_id: user.role_id,
      updatedAt: new Date(),
    };
  }
}
