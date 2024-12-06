const express = require('express');
const router = express.Router();
const connectDB = require('../db'); // Database connection

let db;

// Initialize the database connection
connectDB().then((database) => {
    db = database;
});

// Monitor API: Retrieves sensor data based on query parameters
router.get('/', async (req, res) => {
    const { panel_id, start_time, end_time } = req.query;

    // Validate required query parameter
    if (!panel_id) {
        return res.status(400).json({ error: 'Panel ID is required.' });
    }

    // Build the query object
    const query = { panel_id };

    // Optionally add time range filter
    if (start_time || end_time) {
        query.timestamp = {};
        if (start_time) {
            query.timestamp.$gte = new Date(start_time); // Greater than or equal to
        }
        if (end_time) {
            query.timestamp.$lte = new Date(end_time); // Less than or equal to
        }
    }

    try {
        // Fetch data from the "sensor_logs" collection
        const data = await db
            .collection('sensor_logs')
            .find(query)
            .sort({ timestamp: -1 }) // Most recent data first
            .toArray();

        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
});

module.exports = router;
