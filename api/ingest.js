const express = require('express');
const router = express.Router();
const connectDB = require('../db'); // Database connection

let db;

// Initialize the database connection
connectDB().then((database) => {
    db = database;
});

// Ingest API: Accepts sensor data and stores it in MongoDB
router.post('/', async (req, res) => {
    const { panel_id, temperature, output, timestamp } = req.body;

    // Validate the incoming data
    if (!panel_id || !temperature || !output || !timestamp) {
        return res.status(400).json({ error: 'Invalid data. All fields are required.' });
    }

    try {
        // Insert the data into the "sensor_logs" collection
        await db.collection('sensor_logs').insertOne({
            panel_id,
            temperature,
            output,
            timestamp: new Date(timestamp), // Ensure timestamp is stored in proper format
        });

        res.status(200).json({ message: 'Data ingested successfully' });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

module.exports = router;
