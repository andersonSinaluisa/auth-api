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
import { ApiTags } from '@nestjs/swagger';
import { FindAllQueryDto } from '../utils/query-params';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: UserRequest) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: FindAllQueryDto) {
    const { page, perPage, search, orderBy } = query;
    return this.usersService.findMany(page, perPage, search, orderBy);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserRequestUpdate) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
