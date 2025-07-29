import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Tenant } from 'src/shared/decorators/tenant.decorator';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Payload() createRoleDto: CreateRoleDto, @Tenant() tenantId: string) {
    return this.roleService.create(createRoleDto, tenantId);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search: string,
    @Query('orderBy') orderBy: string[],
    @Tenant() tenantId: string,
  ) {
    return this.roleService.findAll(page, perPage, search, orderBy, tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Tenant() tenantId: string) {
    const _id = parseInt(id.toString());
    return this.roleService.findOne(_id, tenantId);
  }

  @Patch(':id')
  update(
    @Body() updateRoleDto: UpdateRoleDto,
    @Param('id') id: number,
    @Tenant() tenantId: string,
  ) {
    const _id = parseInt(id.toString());

    return this.roleService.update(_id, updateRoleDto, tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Tenant() tenantId: string) {
    const _id = parseInt(id.toString());
    return this.roleService.remove(_id, tenantId);
  }
}
