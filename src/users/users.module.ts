import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/user.repository';
import { SharedModule } from 'src/shared/shared.module';
import { RoleModule } from 'src/role/role.module';
import { RoleRepository } from 'src/role/repository/role.repository';

@Module({
  controllers: [UsersController],
  providers: [UserRepository, UsersService, RoleRepository],
  imports: [SharedModule, RoleModule],
})
export class UsersModule { }