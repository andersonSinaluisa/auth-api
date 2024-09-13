import { BadRequestException, Injectable } from '@nestjs/common';
import { PermissionsRepository } from './repository/permission.repository';
import { PermissionMapper } from './entities/mappers/permission.mapper';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AppRepository } from 'src/app/repository/app.repository';

@Injectable()
export class PermissionsService {

  constructor(
    private readonly prismaService: PermissionsRepository,
    private readonly appService: AppRepository) { }
  create(createPermissionDto: CreatePermissionDto) {
    const app = this.appService.findOne({
      id: createPermissionDto.appId,
    });

    if (!app) {
      throw new BadRequestException({
        message: 'App not found',
      });
    }

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
