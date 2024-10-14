// const express = require('express');


// const router = express.Router();
// const greenScoreController = require('../controllers/greenScoreController');

// // Route to get the Green Score for a user
// router.get('/score/:userId', greenScoreController.getGreenScore);

// // Route to add a new transaction
// router.post('/transaction', greenScoreController.addTransaction);

// // Define the route to save the Green Score
// router.post('/saveGreenScore', greenScoreController.addTransaction);

// module.exports = router;



const express = require('express');
const router = express.Router();
const greenScoreController = require('../controllers/greenScoreController');

// Route to get the Green Score for a user
router.get('/score/:userId', greenScoreController.getGreenScore);

// Route to add a new transaction
router.post('/transaction', greenScoreController.addTransaction);

// Define the route to save the Green Score
router.post('/saveGreenScore', greenScoreController.saveGreenScore); // Ensure this matches your controller

module.exports = router;