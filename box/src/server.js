const express = require('express');
const morgan = require('morgan');
const sendMessage = require("./smpp")

const app = express();
const port = 3000;

// Use Morgan for logging HTTP requests
app.use(morgan('dev'));

// Parse JSON request bodies
app.use(express.json());

// POST route
app.post('/api/v1/vas-box/sms',async (req, res) => {
    // Extract data from request body
    const { senderId, receivers, message } = req.body;
    try {
        const resp = await sendMessage(senderId, receivers, message)
        res.json(resp);
        
    } catch (error) {
        res.json({ok:false, error:error.message});

    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
