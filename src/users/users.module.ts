import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/user.repository';
import { SharedModule } from 'src/shared/shared.module';
import { RoleModule } from 'src/role/role.module';
import { RoleRepository } from 'src/role/repository/role.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UserRepository,
    UsersService,
    RoleRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [SharedModule, RoleModule],
  exports: [UserRepository],
})
export class UsersModule { }
