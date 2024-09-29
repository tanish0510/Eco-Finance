const mongoose = require('mongoose');

const GreenScoreSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    score: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GreenScore', GreenScoreSchema);