const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecoFinance';

const connectDB = async() => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;