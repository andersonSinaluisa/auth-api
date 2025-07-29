import { Permission, Prisma } from '@prisma/client';
import { CreatePermissionDto } from '../../../permissions/dto/create-permission.dto';
import { ReadPermissionDto } from '../../../permissions/dto/read-permission.dto';
import { UpdatePermissionDto } from '../../../permissions/dto/update-permission.dto';

export class PermissionMapper {
  static toEntity(permission: CreatePermissionDto | UpdatePermissionDto) {
    return {
      code: permission.code,
      name: permission.name,
      description: permission.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      app: {
        connect: {
          id: permission.appId,
        },
      },
    } as Prisma.PermissionCreateInput;
  }

  static toDto(permission) {
    return {
      id: permission.id,
      name: permission.name,
      description: permission.description,
      code: permission.code,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
      app: {
        createdAt: permission.app.createdAt,
        description: permission.app.description,
        id: permission.app.id,
        name: permission.app.name,
        updatedAt: permission.app.updatedAt,
        url: permission.app.url,
      },
    } as ReadPermissionDto;
  }
}
