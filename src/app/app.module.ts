import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppRepository } from './repository/app.repository';
import { SharedModule } from 'src/shared/shared.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    AppRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [SharedModule],
  exports: [AppRepository],
})
export class AppModule { }
