const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const ingestRoutes = require('./api/ingest');
const monitorRoutes = require('./api/monitor');
const { connectKafka, runConsumer } = require('./kafka');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

// Connect to Kafka and run the consumer
connectKafka().then(() => {
    runConsumer();
});

app.use('/api/ingest', ingestRoutes);
app.use('/api/monitor', monitorRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
