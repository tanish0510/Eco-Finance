const Transaction = require('../models/Transaction');

/**
 * Get aggregated data from transactions.
 * 
 * @returns {Promise<Array>} Aggregated transaction data.
 */
const getAggregatedData = async() => {
    try {
        const aggregatedData = await Transaction.aggregate([{
            $group: {
                _id: "$transactionType", // Group by transaction type
                totalCO2: { $sum: { $ifNull: ["$co2Emissions", 0] } }, // Sum CO2 emissions, default to 0 if null
                totalEnergy: { $sum: { $ifNull: ["$energyUsage", 0] } }, // Sum energy usage, default to 0 if null
                totalRecycling: { $sum: { $ifNull: ["$recyclingEffort", 0] } } // Sum recycling efforts, default to 0 if null
            }
        }]);

        return aggregatedData; // Return the aggregated results
    } catch (error) {
        console.error('Error aggregating data:', error);
        throw error; // Rethrow the error for further handling
    }
};

module.exports = { getAggregatedData };