import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './repository/role.repository';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleRepository],
  imports: [SharedModule]
})
export class RoleModule { }
