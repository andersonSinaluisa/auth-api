import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppRepository } from './repository/app.repository';
import { SharedModule } from '../shared/shared.module';
import { AppCommand } from './app.command';

@Module({
  controllers: [AppController],
  providers: [AppService, AppRepository, AppCommand],
  imports: [SharedModule],
})
export class AppModule {}
