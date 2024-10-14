import { Permission, Prisma } from '@prisma/client';
import { CreatePermissionDto } from '../../dto/create-permission.dto';
import { ReadPermissionDto } from '../../dto/read-permission.dto';

export class PermissionMapper {
  static toEntity(permission: CreatePermissionDto) {
    return {
      code: permission.code,
      name: permission.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      app: {
        connect: {
          id: permission.appId,
        },
      },
    } as Prisma.PermissionCreateInput;
  }

  static toDto(permission: Permission) {
    return {
      id: permission.id,
      name: permission.name,
      code: permission.code,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
    } as ReadPermissionDto;
  }
}
