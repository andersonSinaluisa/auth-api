import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppRepository } from './repository/app.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [AppController],
  providers: [AppService,AppRepository],
  imports:[SharedModule]
})
export class AppModule { }
