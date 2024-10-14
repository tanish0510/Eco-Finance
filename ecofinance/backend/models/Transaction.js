const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    co2Emissions: { type: Number, required: true },
    transactionType: { type: String, required: true },
    greenScore: { type: Number, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;