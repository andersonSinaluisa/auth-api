import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionRepository } from './repository/permission.repository';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionRepository,PermissionsService],
  imports: [SharedModule],
  exports: [PermissionRepository]
})
export class PermissionsModule {}
