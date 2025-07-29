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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Tenant } from 'src/shared/decorators/tenant.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(
    @Body() createPermissionDto: CreatePermissionDto,
    @Tenant() tenantId: string,
  ) {
    return this.permissionsService.create(createPermissionDto, tenantId);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search: string,
    @Query('orderBy') orderBy: string[],
    @Tenant() tenantId: string,
  ) {
    return this.permissionsService.findAll(
      page,
      perPage,
      search,
      orderBy,
      tenantId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Tenant() tenantId: string) {
    return this.permissionsService.findOne(+id, tenantId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @Tenant() tenantId: string,
  ) {
    return this.permissionsService.update(+id, updatePermissionDto, tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Tenant() tenantId: string) {
    return this.permissionsService.remove(+id, tenantId);
  }
}
