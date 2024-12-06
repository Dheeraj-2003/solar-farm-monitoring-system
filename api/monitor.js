const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    // This could be enhanced to query the database for real-time analysis
    res.status(200).json({ message: 'Monitor endpoint is up!' });
});

module.exports = router;
