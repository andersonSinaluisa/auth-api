import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PermissionsRepository } from './repository/permission.repository';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsRepository],
  imports: [SharedModule]

})
export class PermissionsModule { }
