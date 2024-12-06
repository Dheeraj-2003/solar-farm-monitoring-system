const express = require('express');
const { producer } = require('../kafka');

const router = express.Router();

router.post('/', async (req, res) => {
    const { panel_id, temperature, output, timestamp } = req.body;

    if (!panel_id || !temperature || !output || !timestamp) {
        return res.status(400).json({ error: 'Invalid data: Required fields are missing.' });
    }

    try {
        // Produce the data to the Kafka topic
        await producer.send({
            topic: 'solar-data',
            messages: [
                {
                    key: panel_id,
                    value: JSON.stringify({ panel_id, temperature, output, timestamp }),
                },
            ],
        });
        
        res.status(201).json({ message: 'Data ingested successfully' });
    } catch (error) {
        console.error('Error producing to Kafka:', error);
        res.status(500).json({ error: 'Failed to ingest data.' });
    }
});

module.exports = router;
