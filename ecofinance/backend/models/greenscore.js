// // GreenScore.js
// const mongoose = require('mongoose');

// const greenScoreSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: false, // Change to true if userId is mandatory
//         ref: 'User', // Assuming you have a User model
//     },
//     numberOfPeople: {
//         type: Number,
//         required: true,
//     },
//     electricityUsage: {
//         type: Number,
//         required: true,
//     },
//     renewableEnergy: {
//         type: Number,
//         required: true,
//     },
//     energyEfficiency: {
//         type: Number,
//         required: true,
//     },
//     greenScore: {
//         type: Number,
//         required: true,
//     },
// }, { timestamps: true });

// module.exports = mongoose.model('GreenScore', greenScoreSchema);





// const mongoose = require('mongoose');

// const greenScoreSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User'
//     },
//     numberOfPeople: {
//         type: Number,
//         required: true
//     },
//     electricityUsage: {
//         type: Number,
//         required: true
//     },
//     renewableEnergy: {
//         type: Number,
//         required: true
//     },
//     energyEfficiency: {
//         type: Number,
//         required: true
//     },
//     greenScore: {
//         type: Number,
//         required: true
//     },
//     state: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Create model from schema
// const GreenScore = mongoose.model('GreenScore', greenScoreSchema);

// module.exports = GreenScore;

const mongoose = require('mongoose');

const greenScoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to User model
    },
    numberOfPeople: {
        type: Number,
        required: true,
    },
    electricityUsage: {
        type: Number,
        required: true,
    },
    renewableEnergy: {
        type: Number,
        required: true,
    },
    energyEfficiency: {
        type: Number,
        required: true,
    },
    greenScore: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true, // Ensure this is set to required if you want to store state
    }
});

module.exports = mongoose.model('GreenScore', greenScoreSchema);