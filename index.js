const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for prototype
let sensorData = [];

// API to ingest data
app.post('/api/ingest', (req, res) => {
    const { panel_id, temperature, output, timestamp } = req.body;

    // Basic validation
    if (!panel_id || !temperature || !output || !timestamp) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Store data (mock database)
    sensorData.push({ panel_id, temperature, output, timestamp });
    console.log(`Data received: ${JSON.stringify(req.body)}`);
    res.json({ message: 'Data ingested successfully' });
});

// API to fetch data
app.get('/api/monitor', (req, res) => {
    const { panel_id } = req.query;

    if (!panel_id) {
        return res.status(400).json({ error: 'Panel ID is required' });
    }

    const data = sensorData.filter((d) => d.panel_id === panel_id);
    res.json(data.length > 0 ? data : { message: 'No data found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
