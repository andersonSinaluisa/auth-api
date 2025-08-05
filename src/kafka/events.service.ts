import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class EventsService {
    private kafka;
    constructor() {
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID || 'auth-api',
            brokers: [process.env.KAFKA_HOST || 'localhost:9092'],
        });
    }
    async sendMessage(topic: string, message: string) {
        const producer = this.kafka.producer();
        await producer.connect();
        await producer.send({
            topic,
            messages: [{ value: message }],
        });
        await producer.disconnect();
    }
    async consumeMessages(topic: string) {
        const consumer = this.kafka.consumer({ groupId: 'group-id' });
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                // Handle the received message
                console.log({
                    topic,
                    partition,
                    value: message.value.toString(),
                });
            },
        });
    }
}
