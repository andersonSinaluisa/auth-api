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

  @Post()
  create(@Payload() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search: string,
    @Query('orderBy') orderBy: string[],
  ) {
    return this.roleService.findAll(page, perPage, search, orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const _id = parseInt(id.toString());
    return this.roleService.findOne(_id);
  }

  @Patch(':id')
  update(
    @Body()  updateRoleDto: UpdateRoleDto,
    @Param('id')id: number,
  ) {
    const _id = parseInt(id.toString());

    return this.roleService.update(_id, updateRoleDto);
  }

  @Delete(':id')
  remove( @Param('id') id: number) {
    const _id = parseInt(id.toString());
    return this.roleService.remove(_id);
  }
}
