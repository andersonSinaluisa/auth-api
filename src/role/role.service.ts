import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './repository/role.repository';
import { RoleMapper } from './entities/mappers/role.mapper';
import { orderByFormat } from '../shared/utils/orderby-format';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}
  async create(createRoleDto: CreateRoleDto, tenantId: string) {
    return this.roleRepository.create(
      RoleMapper.toEntity(createRoleDto),
      tenantId,
    );
  }

  async findAll(
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string[],
    tenantId?: string,
  ) {
    return this.roleRepository.findMany({
      tenantId,
      page,
      perPage,
      orderBy: {
        name: orderBy != undefined ? orderByFormat(orderBy, 'name') : undefined,
        id: orderBy != undefined ? orderByFormat(orderBy, 'id') : undefined,
        createdAt:
          orderBy != undefined
            ? orderByFormat(orderBy, 'createdAt')
            : undefined,
      },
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                },
              },
            ],
            AND: {
              deleted: false,
            },
          }
        : {
            deleted: false,
          },
    });
  }

  async findOne(id: number, tenantId: string) {
    const res = await this.roleRepository.findOne(id, tenantId);
    if (!res) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return res;
  }

  update(id: number, updateRoleDto: UpdateRoleDto, tenantId: string) {
    return this.roleRepository.update(
      id,
      RoleMapper.toEntityUpdate(updateRoleDto),
      tenantId,
    );
  }

  remove(id: number, tenantId: string) {
    return this.roleRepository.remove(id, tenantId);
  }
}
