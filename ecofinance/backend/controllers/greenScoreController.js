const Transaction = require('../models/Transaction');
const GreenScore = require('../models/GreenScore'); // Import the GreenScore model
const { calculateGreenScore } = require('../services/greenScoreService');

// Function to calculate the Green Score based on transactions
exports.getGreenScore = async(req, res) => {
    try {
        const userId = req.params.userId;

        // Fetching all transactions for the specified user
        const transactions = await Transaction.find({ userId });

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found for this user." });
        }

        // Calculate the Green Score based on transactions
        const score = calculateGreenScore(transactions);

        // Save the score in the database
        await saveGreenScore(userId, score);

        return res.status(200).json({ score });
    } catch (error) {
        console.error("Error calculating Green Score:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Add new transaction for a user
exports.addTransaction = async(req, res) => {
    try {
        console.log("Received transaction data:", req.body); // Log incoming data
        const transactionData = req.body;
        const transaction = new Transaction(transactionData);
        await transaction.save();

        return res.status(201).json({ message: "Transaction added successfully!", transaction });
    } catch (error) {
        console.error("Error saving transaction:", error); // Log any error
        return res.status(500).json({ error: error.message });
    }
};


// Function to save the Green Score to the database
const saveGreenScore = async(userId, score) => {
    try {
        const newScore = new GreenScore({ userId, score });
        await newScore.save();
        console.log("Green Score saved successfully:", newScore);
    } catch (error) {
        console.error("Error saving Green Score:", error); // Log any error
    }
};