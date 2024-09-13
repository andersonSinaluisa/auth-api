import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('Rol')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @MessagePattern('createRole')
  @Post()
  create(@Payload() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @MessagePattern('findAllRole')
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @MessagePattern('findOneRole')
  @Get()
  findOne(@Payload() id: number) {
    return this.roleService.findOne(id);
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
