import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './repository/role.repository';
import { RoleMapper } from './entities/mappers/role.mapper';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) { }
  async create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.create(RoleMapper.toEntity(createRoleDto));
  }

  async findAll() {
    return (await this.roleRepository.findAll()).map(RoleMapper.toDto);
  }

  findOne(id: number) {
    return this.roleRepository.findOne(id);
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
