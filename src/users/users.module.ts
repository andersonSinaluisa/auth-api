import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/user.repository';
import { SharedModule } from '../shared/shared.module';
import { RoleModule } from '../role/role.module';
import { RoleRepository } from '../role/repository/role.repository';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UserRepository,
    UsersService,
    RoleRepository,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [SharedModule, RoleModule],
  exports: [UserRepository, UsersService],
})
export class UsersModule { }
