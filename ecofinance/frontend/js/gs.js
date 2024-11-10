document.getElementById('greenScoreForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const numPeople = parseInt(document.getElementById('numPeople').value);
    const electricityUsage = parseInt(document.getElementById('electricityUsage').value);
    const renewableEnergy = parseFloat(document.getElementById('renewableEnergy').value);
    const energyEfficiency = parseInt(document.getElementById('energyEfficiency').value);

    // Calculate Green Score
    const greenScore = (renewableEnergy / 100 * 10) + (energyEfficiency / 5 * 10) - (electricityUsage / 100 * numPeople);

    document.getElementById('result').innerText = `Your Green Score: ${greenScore.toFixed(2)}`;

    // Save to MongoDB
    try {
        const response = await fetch('http://localhost:5000/api/saveGreenScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: "64bcae5cf7c123456789abcd", // Replace with actual userId if necessary
                numberOfPeople: numPeople,
                electricityUsage: electricityUsage,
                renewableEnergy: renewableEnergy,
                energyEfficiency: energyEfficiency,
                greenScore: greenScore.toFixed(2), // Include the calculated green score
            }),
        });

        if (response.ok) {
            console.log('Green Score saved successfully!');
            document.getElementById('result').innerText += " (Saved to database)";
        } else {
            const errorData = await response.json();
            console.error('Error saving Green Score:', errorData);
            document.getElementById('result').innerText = 'Error saving Green Score. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error connecting to the server. Please try again.';
    }
});





// document.getElementById('greenScoreForm').addEventListener('submit', async function(event) {
//     event.preventDefault();

//     const numPeople = parseInt(document.getElementById('numPeople').value);
//     const electricityUsage = parseInt(document.getElementById('electricityUsage').value);
//     const renewableEnergy = parseFloat(document.getElementById('renewableEnergy').value);
//     const energyEfficiency = parseInt(document.getElementById('energyEfficiency').value);

//     // Calculate Green Score
//     const greenScore = (renewableEnergy / 100 * 10) + (energyEfficiency / 5 * 10) - (electricityUsage / 100 * numPeople);

//     document.getElementById('result').innerText = `Your Green Score: ${greenScore.toFixed(2)}`;

//     // Save to MongoDB
//     try {
//         const response = await fetch('http://localhost:5000/api/auth/saveGreenScore', { // Corrected the URL
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 userId: "64bcae5cf7c123456789abcd", // Replace with actual userId dynamically if needed
//                 numberOfPeople: numPeople,
//                 electricityUsage: electricityUsage,
//                 renewableEnergy: renewableEnergy,
//                 energyEfficiency: energyEfficiency,
//                 greenScore: greenScore.toFixed(2), // Include the calculated green score
//             }),
//         });

//         if (response.ok) {
//             console.log('Green Score saved successfully!');
//             document.getElementById('result').innerText += " (Saved to database)";
//         } else {
//             const errorData = await response.json();
//             console.error('Error saving Green Score:', errorData);
//             document.getElementById('result').innerText = 'Error saving Green Score. Please try again.';
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         document.getElementById('result').innerText = 'Error connecting to the server. Please try again.';
//     }
// });