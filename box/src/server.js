require("./connections/mongodb")();
const express = require('express');
const morgan = require('morgan');
const cors = require("cors")




const app = express();
const port = 3000;


// Use Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(cors())

// Parse JSON request bodies
app.use(express.json());

// POST route
app.use("/api/v1/vas",require("./routes/routes")(express))
app.use("/api/v1/user",require("./routes/user.route")(express))

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

app.use((err, req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
