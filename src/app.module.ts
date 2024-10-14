import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './shared/prisma/prisma.service';
import { SharedModule } from './shared/shared.module';
import { RoleModule } from './role/role.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AppModule as App } from './app/app.module';
import { AuthModule } from './auth/auth.module';
import { MainMiddleware } from './main.middleware';
import { CreateUserCommand } from './commands/create-user.command';
import { CreateRolCommand } from './commands/create-rol.command';
import { UsersService } from './users/users.service';
import { RoleService } from './role/role.service';
import { PermissionsService } from './permissions/permissions.service';
import { CommandRunnerModule } from 'nest-commander';
import { EventsModule } from './events/events.module';
@Module({
  imports: [
    CommandRunnerModule,
    UsersModule,
    SharedModule,
    RoleModule,
    PermissionsModule,
    App,
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    PermissionsService,
    UsersService,
    RoleService,
    CreateUserCommand,
    CreateRolCommand,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MainMiddleware).forRoutes('*');
  }
}
