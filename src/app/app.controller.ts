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
import { AppService } from './app.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { FindAllQueryDto } from 'src/utils/query-params';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

@Controller('app')
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  create(@Body() createAppDto: CreateAppDto) {
    return this.appService.create(createAppDto);
  }
  @Get()
  findAll(@Query() query: FindAllQueryDto) {
    const { page, perPage, search, orderBy } = query;
    return this.appService.findAll(page, perPage, search, orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppDto: UpdateAppDto) {
    return this.appService.update(+id, updateAppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.remove(+id);
  }
}
