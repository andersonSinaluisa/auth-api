import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRequest } from './dto/user.create.dto';
import { UserRequestUpdate } from './dto/user.update.dto';
import { Tenant } from 'src/shared/decorators/tenant.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: UserRequest, @Tenant() tenantId: string) {
    return this.usersService.create(createUserDto, tenantId);
  }

  @Get()
  findAll(
    @Tenant() tenantId: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: string[],
  ) {
    return this.usersService.findMany(tenantId, page, perPage, search, orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Tenant() tenantId: string) {
    return this.usersService.findOne(+id, tenantId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UserRequestUpdate,
    @Tenant() tenantId: string,
  ) {
    return this.usersService.update(+id, updateUserDto, tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Tenant() tenantId: string) {
    return this.usersService.remove(+id, tenantId);
  }
}
