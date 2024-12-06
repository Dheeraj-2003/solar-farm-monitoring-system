const { MongoClient } = require('mongodb');

// MongoDB connection URI (use environment variables for security)
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/solar_farm';

// Database name
const dbName = 'solar_farm';

let dbInstance;

// Function to connect to MongoDB
async function connectDB() {
    if (dbInstance) {
        return dbInstance; // Return the existing instance if already connected
    }

    try {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Connect to the MongoDB server
        await client.connect();

        console.log('Connected to MongoDB');
        dbInstance = client.db(dbName); // Select the database
        return dbInstance;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;
