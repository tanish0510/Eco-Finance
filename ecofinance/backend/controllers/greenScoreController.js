// const mongoose = require('mongoose');
// const Transaction = require('../models/Transaction'); // Assuming you have a Transaction model
// const GreenScore = require('../models/greenscore'); // Assuming you have a GreenScore model

// // Function to calculate the Green Score based on input parameters
// exports.calculateGreenScore = (numberOfPeople, electricityUsage, renewableEnergy, energyEfficiency) => {
//     const baseScore = 100; // Start with a base score of 100
//     const peopleFactor = numberOfPeople * 2; // More people reduces the score
//     const electricityFactor = electricityUsage * 0.5; // Higher electricity usage reduces the score
//     const renewableFactor = (renewableEnergy / 100) * 20; // Higher renewable energy increases the score
//     const efficiencyFactor = energyEfficiency * 5; // Better energy efficiency rating increases the score

//     // Calculate the final green score
//     const greenScore = baseScore - (peopleFactor + electricityFactor) + renewableFactor + efficiencyFactor;

//     // Ensure the score is not negative
//     return greenScore > 0 ? greenScore : 0;
// };

// // Function to get the Green Score for a user
// exports.getGreenScore = async(req, res) => {
//     try {
//         const { userId } = req.params;

//         // Validate userId format
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid userId format" });
//         }

//         // Fetch the green score for the user from the GreenScore collection (assuming the model exists)
//         const greenScoreRecord = await GreenScore.findOne({ userId });

//         if (!greenScoreRecord) {
//             return res.status(404).json({ message: "Green Score not found for this user" });
//         }

//         return res.status(200).json({ greenScore: greenScoreRecord.greenScore });
//     } catch (error) {
//         console.error("Error fetching Green Score:", error);
//         return res.status(500).json({ error: error.message });
//     }
// };

// // Function to add a new transaction and calculate Green Score
// exports.addTransaction = async(req, res) => {
//     try {
//         const { userId, co2Emissions, transactionType } = req.body;

//         // Validate input
//         if (!userId || !co2Emissions || !transactionType) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         // Validate userId format
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid userId format" });
//         }

//         // Create ObjectId using 'new'
//         const userObjectId = new mongoose.Types.ObjectId(userId);

//         // Create a new transaction
//         const transaction = new Transaction({
//             userId: userObjectId,
//             co2Emissions,
//             transactionType,
//         });

//         await transaction.save();

//         return res.status(201).json({ message: "Transaction added successfully!", transaction });
//     } catch (error) {
//         console.error("Error saving transaction:", error);
//         return res.status(500).json({ error: error.message });
//     }
// };

// // Function to save Green Score after calculation
// exports.saveGreenScore = async(req, res) => {
//     try {
//         const { userId, numberOfPeople, electricityUsage, renewableEnergy, energyEfficiency } = req.body;

//         // Validate input
//         if (!userId || !numberOfPeople || !electricityUsage || !renewableEnergy || !energyEfficiency) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         // Validate userId format
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid userId format" });
//         }

//         // Calculate the Green Score
//         const greenScore = exports.calculateGreenScore(numberOfPeople, electricityUsage, renewableEnergy, energyEfficiency);

//         // Save the green score to MongoDB
//         const greenScoreData = new GreenScore({
//             userId: new mongoose.Types.ObjectId(userId),
//             numberOfPeople,
//             electricityUsage,
//             renewableEnergy,
//             energyEfficiency,
//             greenScore,
//         });

//         await greenScoreData.save();

//         return res.status(201).json({ message: "Green Score saved successfully!", greenScore });
//     } catch (error) {
//         console.error("Error saving Green Score:", error);
//         return res.status(500).json({ error: error.message });
//     }
// };




const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const GreenScore = require('../models/greenscore');
const UserState = require('../models/userstate');

// Function to calculate the Green Score based on input parameters
exports.calculateGreenScore = (numberOfPeople, electricityUsage, renewableEnergy, energyEfficiency) => {
    const baseScore = 100; // Start with a base score of 100
    const peopleFactor = numberOfPeople * 2; // More people reduces the score
    const electricityFactor = electricityUsage * 0.5; // Higher electricity usage reduces the score
    const renewableFactor = (renewableEnergy / 100) * 20; // Higher renewable energy increases the score
    const efficiencyFactor = energyEfficiency * 5; // Better energy efficiency rating increases the score

    // Calculate the final green score
    const greenScore = baseScore - (peopleFactor + electricityFactor) + renewableFactor + efficiencyFactor;

    // Ensure the score is not negative
    return greenScore > 0 ? greenScore : 0;
};

// Function to get the Green Score for a user
exports.getGreenScore = async(req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        // Fetch the green score for the user from the GreenScore collection
        const greenScoreRecord = await GreenScore.findOne({ userId });

        if (!greenScoreRecord) {
            return res.status(404).json({ message: "Green Score not found for this user" });
        }

        return res.status(200).json({ greenScore: greenScoreRecord.greenScore });
    } catch (error) {
        console.error("Error fetching Green Score:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Function to add a new transaction
exports.addTransaction = async(req, res) => {
    try {
        const { userId, co2Emissions, transactionType } = req.body;

        // Validate input
        if (!userId || !co2Emissions || !transactionType) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        // Create a new transaction
        const transaction = new Transaction({
            userId: new mongoose.Types.ObjectId(userId),
            co2Emissions,
            transactionType,
        });

        await transaction.save();

        return res.status(201).json({ message: "Transaction added successfully!", transaction });
    } catch (error) {
        console.error("Error saving transaction:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Function to save Green Score after calculation along with state
exports.saveGreenScore = async(req, res) => {
    try {
        // Extract parameters from req.body
        const { userId, numberOfPeople, electricityUsage, renewableEnergy, energyEfficiency, state } = req.body;

        // Validate required fields
        if (!userId || !numberOfPeople || !electricityUsage || !renewableEnergy || !energyEfficiency || !state) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        // Calculate the Green Score
        const greenScore = exports.calculateGreenScore(numberOfPeople, electricityUsage, renewableEnergy, energyEfficiency);

        // Prepare data for saving
        const greenScoreData = new GreenScore({
            userId: new mongoose.Types.ObjectId(userId),
            numberOfPeople,
            electricityUsage,
            renewableEnergy,
            energyEfficiency,
            greenScore,
            state,
        });

        // Save the green score to MongoDB
        await greenScoreData.save();

        // Prepare data for user state
        const userState = new UserState({
            userId: new mongoose.Types.ObjectId(userId),
            state
        });

        // Save user state to UserState collection
        await userState.save();

        return res.status(201).json({ message: "Green Score and User State saved successfully!", greenScore });
    } catch (error) {
        console.error("Error saving Green Score and User State:", error);
        return res.status(500).json({ error: error.message });
    }
};