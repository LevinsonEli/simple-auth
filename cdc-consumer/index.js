import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: 'cdc-logger',
  brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({ groupId: 'cdc-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.TOPIC, fromBeginning: false });

  console.log('CDC Consumer is listening to DB changes...');

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const change = JSON.parse(message.value.toString());
        const { database, table, type, data } = change;

        console.log(JSON.stringify({
          timestamp: new Date().toISOString(),
          database,
          table,
          type,       // INSERT, UPDATE, DELETE
          data
        }));
      } catch (e) {
        console.error('Failed to parse CDC message:', e.message);
      }
    }
  });
};

run().catch(console.error);
