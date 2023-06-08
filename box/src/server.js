require("./connections/mongodb")();
const express = require('express');
const morgan = require('morgan');




const app = express();
const port = 3000;


// Use Morgan for logging HTTP requests
app.use(morgan('dev'));

// Parse JSON request bodies
app.use(express.json());

// POST route
app.use("/api/v1",require("./routes/routes")(express))

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
