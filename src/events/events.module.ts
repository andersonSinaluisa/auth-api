import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_HOST],
          },
          consumer: {
            groupId: 'auth-group-id',
            retry: {
              retries: 10,
              initialRetryTime: 300,
            },
          },
        },
      },
    ]),
  ],
  providers: [EventsService],
  exports: [EventsService, ClientsModule],
})
export class EventsModule { }
