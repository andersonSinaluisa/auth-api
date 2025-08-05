import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { KafkaModule } from '../kafka/kafka.module';
import { SessionsModule } from '../sessions/sessions.module';
import { BlacklistService } from './blacklist.service';

@Module({
  imports:[
    SharedModule,
    KafkaModule,
    UsersModule,
    SessionsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, BlacklistService],
  controllers: [AuthController],
  exports:[BlacklistService]
})
export class AuthModule { }
