// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const greenScoreRouter = require('./backend/routes/greenScoreRoutes');
// const cors = require('cors'); // Import the cors package

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all routes

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/ecofinance', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log("Connected to MongoDB!");
//     })
//     .catch((error) => {
//         console.error("Error connecting to MongoDB:", error);
//     });

// // Use the routes
// app.use('/api/auth', greenScoreRouter); // Route prefix for all green score-related APIs

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


// // // server.js
// // require('dotenv').config(); // Load environment variables
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // const cors = require('cors'); // Import the cors package
// // const authRoutes = require('./backend/routes/authRoutes'); // Import your auth routes

// // const app = express();

// // // Middleware
// // app.use(bodyParser.json()); // Parse incoming JSON requests
// // app.use(cors()); // Enable CORS for all routes

// // // Connect to MongoDB
// // const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecofinance';
// // mongoose.connect(mongoUri, {
// //         useNewUrlParser: true,
// //         useUnifiedTopology: true,
// //     })
// //     .then(() => {
// //         console.log("Connected to MongoDB!");
// //     })
// //     .catch((error) => {
// //         console.error("Error connecting to MongoDB:", error);
// //     });

// // // Use the routes
// // app.use('/api/auth', authRoutes); // Use auth routes with /api/auth prefix

// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //     console.error(err.stack);
// //     res.status(500).json({ message: 'Something went wrong!' });
// // });

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// // });





// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const greenScoreRouter = require('./backend/routes/greenScoreRoutes'); // Import green score routes
// const cors = require('cors'); // Import the cors package

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all routes

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/ecofinance', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log("Connected to MongoDB!");
//     })
//     .catch((error) => {
//         console.error("Error connecting to MongoDB:", error);
//     });

// // Use the routes
// app.use('/api', greenScoreRouter); // Adjusted prefix to /api for the routes

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const greenScoreRoutes = require('./backend/routes/greenScoreRoutes'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecofinance', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the green score routes
app.use('/api', greenScoreRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});