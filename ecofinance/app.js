const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Built-in middleware for JSON parsing

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecofinance';

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Define a schema and model for the Green Score
const GreenScoreSchema = new mongoose.Schema({
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const GreenScore = mongoose.model('GreenScore', GreenScoreSchema);

// API to save green score
app.post('/api/saveGreenScore', async(req, res) => {
    const { greenScore } = req.body;

    if (greenScore === undefined) {
        return res.status(400).send('Green Score is required.');
    }

    const newScore = new GreenScore({ score: greenScore });

    try {
        await newScore.save();
        res.status(201).send('Green Score saved successfully!');
    } catch (error) {
        console.error('Error saving Green Score:', error);
        res.status(500).send('Error saving Green Score: ' + error.message);
    }
});

// Set up the HTTP server and Socket.io
const server = http.createServer(app);
const io = socketIo(server);

// Handle socket connections
io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for disconnect event
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});