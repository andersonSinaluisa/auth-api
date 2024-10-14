import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UserRepository } from '../users/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/config';
import { SharedModule } from '../shared/shared.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    SharedModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule { }
