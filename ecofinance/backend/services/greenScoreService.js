/**
 * Function to calculate the Green Score based on transactions.
 * 
 * @param {Array} transactions - Array of transaction objects.
 * @returns {string} - The calculated green score, rounded to two decimal places.
 */
function calculateGreenScore(transactions) {
    let totalCO2 = 0;
    let totalEnergy = 0;
    let recyclingScore = 0;
    const count = transactions.length;

    // If there are no transactions, return a score of 0
    if (count === 0) {
        return (0).toFixed(2);
    }

    transactions.forEach(transaction => {
        totalCO2 += transaction.co2Emissions || 0; // Use 0 if undefined
        totalEnergy += transaction.energyUsage || 0; // Use 0 if undefined
        recyclingScore += transaction.recyclingEffort || 0; // Use 0 if undefined
    });

    // Calculating average recycling score
    const averageRecycling = recyclingScore / count;

    // Calculating the green score
    const score = Math.max(0, 100 - (totalCO2 / count) - (totalEnergy / count) + averageRecycling);

    return score.toFixed(2); // Return score rounded to two decimal places
}

module.exports = {
    calculateGreenScore
};