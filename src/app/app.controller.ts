import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { Tenant } from 'src/shared/decorators/tenant.decorator';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Tenant() tenantId: string, @Body() createAppDto: CreateAppDto) {
    return this.appService.create(createAppDto, tenantId);
  }

  @Get()
  findAll(@Tenant() tenantId: string) {
    if (!tenantId) {
      throw new Error('Tenant ID is required');
    }
    // Pass the tenantId to the service method
    return this.appService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Tenant() tenantId: string) {
    return this.appService.findOne(+id, tenantId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppDto: UpdateAppDto,
    @Tenant() tenantId: string,
  ) {
    return this.appService.update(+id, updateAppDto, tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Tenant() tenantId: string) {
    return this.appService.remove(+id, tenantId);
  }
}
