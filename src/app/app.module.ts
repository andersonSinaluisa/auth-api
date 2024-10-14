import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppRepository } from './repository/app.repository';
import { SharedModule } from '../shared/shared.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    AppRepository,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [SharedModule],
  exports: [AppRepository],
})
export class AppModule { }
