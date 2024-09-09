import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './shared/prisma/prisma.service';
import { SharedModule } from './shared/shared.module';
import { RoleModule } from './role/role.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AppModule as App } from './app/app.module';

@Module({
  imports: [UsersModule, SharedModule, RoleModule, PermissionsModule, App],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
