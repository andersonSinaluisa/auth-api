import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './repository/role.repository';
import { SharedModule } from '../shared/shared.module';
import { RoleCommand } from './role.commad';
import { PermissionsModule } from '../permissions/permissions.module';
import { PermissionsService } from '../permissions/permissions.service';

@Module({
  controllers: [RoleController],
  providers: [RoleRepository, RoleService, PermissionsService, RoleCommand],
  exports: [RoleRepository, RoleCommand],
  imports: [SharedModule, PermissionsModule],
})
export class RoleModule {}
