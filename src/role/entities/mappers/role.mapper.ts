import { Prisma, Role } from '@prisma/client';
import { CreateRoleDto } from '../../../role/dto/create-role.dto';
import { ReadRoleDto } from '../../../role/dto/read-role.dto';
import { UpdateRoleDto } from '../../../role/dto/update-role.dto';

export class RoleMapper {
  static toEntity(role: CreateRoleDto) {
    return {
      name: role.name,
      permissions: {
        connect: role.permissions.map((id) => ({ id })),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Prisma.RoleCreateInput;
  }

  static toEntityUpdate(role: UpdateRoleDto) {
    return {
      name: role.name,
      permissions: {
        set: role.permissions.map((id) => ({ id })),
      },
    } as Prisma.RoleUncheckedUpdateInput;
  }

  static toDto(role: Role): ReadRoleDto {
    return {
      id: role.id,
      name: role.name,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }
}
