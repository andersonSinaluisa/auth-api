import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class EventsService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect(); // Conéctate a Kafka
  }

  async sendMessage(topic: string, message: any) {
    // Enviar el mensaje al topic especificado
    return this.kafkaClient.send(topic, {
      key: 'my-key', // Opcional, puedes especificar una clave
      value: message,
    });
  }
}
