import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppRepository } from './repository/app.repository';

@Module({
  controllers: [AppController],
  providers: [AppService, AppRepository]
})
export class AppModule { }
