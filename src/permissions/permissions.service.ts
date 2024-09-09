import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from './repository/permission.repository';
import { PermissionMapper } from './entities/mappers/permission.mapper';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private readonly prismaService: PermissionsRepository) { }
  create(createPermissionDto: CreatePermissionDto) {
    return this.prismaService.create(
      PermissionMapper.toEntity(createPermissionDto),
    );
  }

  findAll() {
    return this.prismaService.findAll();
  }

  findOne(id: number) {
    return this.prismaService.findOne(id);
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.prismaService.update(+id, updatePermissionDto);
  }

  remove(id: number) {
    return this.prismaService.remove(+id);
  }
}
