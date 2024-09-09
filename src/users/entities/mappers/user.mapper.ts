import { Prisma, User } from '@prisma/client';
import { UserRequest } from '../../dto/user.create.dto';
import { UserResponseDto } from 'src/users/dto/user.read.dto';

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
