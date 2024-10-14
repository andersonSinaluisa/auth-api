import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './repository/role.repository';
import { SharedModule } from '../shared/shared.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleRepository,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [RoleRepository, RoleService],
  imports: [SharedModule],
})
export class RoleModule { }
