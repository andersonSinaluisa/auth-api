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
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @MessagePattern('createRole')
  @Post()
  create(@Payload() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @MessagePattern('findAllRole')
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search: string,
    @Query('orderBy') orderBy: string[],
  ) {
    return this.roleService.findAll(page, perPage, search, orderBy);
  }

  @MessagePattern('findOneRole')
  @Get(':id')
  findOne(@Param('id') id: number) {
    const _id = parseInt(id.toString());
    return this.roleService.findOne(_id);
  }

  @MessagePattern('updateRole')
  @Patch(':id')
  update(
    @Body() @Payload() updateRoleDto: UpdateRoleDto,
    @Param('id') @Payload() id: number,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @MessagePattern('removeRole')
  @Delete(':id')
  remove(@Payload() @Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
