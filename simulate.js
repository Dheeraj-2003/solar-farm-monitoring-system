const axios = require('axios');

const generateData = () => {
    const panel_id = `SP${Math.floor(Math.random() * 100)}`;
    const temperature = (Math.random() * 30 + 20).toFixed(2);
    const output = (Math.random() * 100 + 50).toFixed(2);
    const timestamp = new Date().toISOString();

    return { panel_id, temperature, output, timestamp };
};

const sendData = async () => {
    const data = generateData();
    try {
        const response = await axios.post('http://localhost:5000/api/ingest', data);
        console.log(`Data sent: ${JSON.stringify(data)} | Response: ${response.data.message}`);
    } catch (error) {
        console.error('Error sending data:', error.message);
    }
};

setInterval(sendData, 5000); // Send data every 5 seconds
