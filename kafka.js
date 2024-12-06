const { Kafka } = require('kafkajs');
const dotenv = require('dotenv');

dotenv.config();

// Kafka client configuration
const kafka = new Kafka({
    clientId: 'solar-farm-monitoring',
    brokers: [process.env.KAFKA_BROKER] // E.g., 'localhost:9092'
});

// Create a Kafka producer
const producer = kafka.producer();

// Create a Kafka consumer
const consumer = kafka.consumer({ groupId: 'solar-group' });

// Connect the producer and consumer
const connectKafka = async () => {
    try {
        await producer.connect();
        console.log('Kafka Producer connected successfully');
    } catch (error) {
        console.error('Kafka Producer connection failed:', error);
        process.exit(1);
    }
};

// Function to run consumer (for monitoring incoming data)
const runConsumer = async () => {
    await consumer.connect();
    console.log('Kafka Consumer connected successfully');

    await consumer.subscribe({ topic: 'solar-data', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received message: ${message.value.toString()}`);
            // Here, you could process the message, store it in DB, etc.
        },
    });
};

module.exports = { connectKafka, producer, runConsumer };
