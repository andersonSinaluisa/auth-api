import { Prisma, Role } from '@prisma/client';
import { CreateRoleDto } from 'src/role/dto/create-role.dto';
import { UpdateRoleDto } from 'src/role/dto/update-role.dto';

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
        connect: role.permissions.map((id) => ({ id })),
      },
    } as Prisma.RoleUncheckedUpdateInput;
  }

  static toDto(role: Role) {
    return {
      id: role.id,
      name: role.name,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }
}