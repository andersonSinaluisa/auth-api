import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/user.repository';
import { SharedModule } from '../shared/shared.module';
import { RoleModule } from '../role/role.module';
import { RoleRepository } from '../role/repository/role.repository';
import { KafkaModule } from '../kafka/kafka.module';
import { UserCommand } from './user.command';

@Module({
  controllers: [UsersController],
  providers: [UserRepository, UsersService, RoleRepository, UserCommand],
  imports: [KafkaModule, SharedModule, RoleModule, ],
  exports: [UserRepository, UsersService, UserCommand],
})
export class UsersModule { }
