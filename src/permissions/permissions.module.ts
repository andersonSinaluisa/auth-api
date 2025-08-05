import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionRepository } from './repository/permission.repository';
import { SharedModule } from '../shared/shared.module';
import { PermissionCommand } from './permission.command';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionRepository, PermissionsService, PermissionCommand],
  imports: [SharedModule],
  exports: [PermissionRepository, PermissionsService]
})
export class PermissionsModule {}
