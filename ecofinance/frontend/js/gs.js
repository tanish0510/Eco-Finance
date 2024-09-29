document.getElementById('greenScoreForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const numPeople = parseInt(document.getElementById('numPeople').value);
    const electricityUsage = parseInt(document.getElementById('electricityUsage').value);
    const renewableEnergy = parseFloat(document.getElementById('renewableEnergy').value);
    const energyEfficiency = parseInt(document.getElementById('energyEfficiency').value);

    // Calculate Green Score
    const greenScore = (renewableEnergy / 100 * 10) + (energyEfficiency / 5 * 10) - (electricityUsage / 100 * numPeople);

    // Display the Green Score
    document.getElementById('result').innerText = `Your Green Score: ${greenScore.toFixed(2)}`;

    // Save to MongoDB
    try {
        const response = await fetch('/api/saveGreenScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ greenScore }),
        });

        if (response.ok) {
            console.log('Green Score saved successfully!');
        } else {
            console.error('Error saving Green Score:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});