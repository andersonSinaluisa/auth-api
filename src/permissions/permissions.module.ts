import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { SharedModule } from '../shared/shared.module';
import { PermissionsRepository } from './repository/permission.repository';
import { AppRepository } from '../app/repository/app.repository';
import { AppModule } from '../app/app.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [PermissionsController],
  providers: [
    PermissionsRepository,
    PermissionsService,
    AppRepository,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [SharedModule, AppModule],
  exports: [PermissionsRepository, PermissionsService],
})
export class PermissionsModule {}
