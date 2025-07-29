import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './shared/prisma/prisma.service';
import { SharedModule } from './shared/shared.module';
import { RoleModule } from './role/role.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AppModule as App } from './app/app.module';
import { KafkaModule } from './kafka/kafka.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    UsersModule,
    SharedModule,
    RoleModule,
    PermissionsModule,
    App,
    KafkaModule,
    SessionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
