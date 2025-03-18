import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './repository/role.repository';
import { RoleMapper } from './entities/mappers/role.mapper';
import { orderByFormat } from 'src/shared/utils/orderby-format';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) { }
  async create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.create(RoleMapper.toEntity(createRoleDto));
  }

  async findAll(page: number,
    perPage: number,
    search?: string,
    orderBy?: string[],) {
      return this.roleRepository.findMany({
          page,
          perPage,
          orderBy: {
            name: orderBy !=undefined? orderByFormat(orderBy, 'name'):undefined,
            id: orderBy != undefined ? orderByFormat(orderBy, 'id') : undefined,
            createdAt: orderBy != undefined  ? orderByFormat(orderBy, 'createdAt') : undefined,
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
                AND:{
                  deleted: false
                }
              }
           : undefined,
        });
  }

  async findOne(id: number) {
    const res = await this.roleRepository.findOne(id);
    if (!res) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return res;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(
      id,
      RoleMapper.toEntityUpdate(updateRoleDto),
    );
  }

  remove(id: number) {
    return this.roleRepository.remove(id);
  }
}
