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



// // const express = require('express');
// // const router = express.Router();
// // const greenScoreController = require('../controllers/greenScoreController');

// // // Route to get the Green Score for a user
// // // Example: GET /api/greenscore/score/{userId}
// // router.get('/score/:userId', greenScoreController.getGreenScore);

// // // Route to add a new transaction
// // // Example: POST /api/greenscore/transaction
// // router.post('/transaction', greenScoreController.addTransaction);

// // // Route to save the Green Score
// // // Example: POST /api/greenscore/saveGreenScore
// // router.post('/saveGreenScore', greenScoreController.saveGreenScore); // Ensure this matches your controller

// // module.exports = router;





// const express = require('express');
// const router = express.Router();
// const greenScoreController = require('../controllers/greenScoreController');

// // Route to get the Green Score for a user
// // Example: GET /api/auth/score/{userId}
// router.get('/score/:userId', greenScoreController.getGreenScore);

// // Route to add a new transaction
// // Example: POST /api/auth/transaction
// router.post('/transaction', greenScoreController.addTransaction);

// // Route to save the Green Score
// // Example: POST /api/auth/saveGreenScore
// router.post('/saveGreenScore', greenScoreController.saveGreenScore); // Correct method for saving green score

// module.exports = router;





const express = require('express');
const router = express.Router();
const greenScoreController = require('../controllers/greenScoreController');

// Route to get the Green Score for a user
// Example: GET /api/score/{userId}
router.get('/score/:userId', greenScoreController.getGreenScore);

// Route to save the Green Score
// Example: POST /api/saveGreenScore
router.post('/saveGreenScore', greenScoreController.saveGreenScore);

// Route to add a new transaction
// Example: POST /api/transaction
router.post('/transaction', greenScoreController.addTransaction);

module.exports = router; // Ensure this line is present