const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    transactionType: { type: String, required: true },
    co2Emissions: { type: Number, required: true },
    energyUsage: { type: Number, required: false },
    recyclingEffort: { type: Number, required: false },
    transactionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);