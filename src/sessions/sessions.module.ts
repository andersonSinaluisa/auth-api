import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SessionRepository } from './repository/session.repository';
import { SessionsService } from './sessions.service';
import { KafkaModule } from '../kafka/kafka.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule, UsersModule, KafkaModule],
  providers: [SessionRepository, SessionsService],
  controllers: [SessionsController],
  exports: [SessionsService],
})
export class SessionsModule {}
