import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PermissionsRepository } from './repository/permission.repository';
import { AppRepository } from 'src/app/repository/app.repository';
import { AppModule } from 'src/app/app.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [PermissionsController],
  providers: [
    PermissionsRepository,
    PermissionsService,
    AppRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [SharedModule, AppModule],
  exports: [PermissionsRepository],
})
export class PermissionsModule { }
