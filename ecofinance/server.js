// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const greenScoreRouter = require('./backend/routes/greenScoreRoutes');
const cors = require('cors'); // Import the cors package

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecofinance', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Use the routes
app.use('/api', greenScoreRouter); // Route prefix for all green score-related APIs

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});