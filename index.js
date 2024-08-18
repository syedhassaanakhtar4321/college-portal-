// index.js
const express = require('express');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auth.routes.js');
const voteRoutes = require('./routes/vote.routes.js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Init middleware
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/vote', voteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port ${PORT}"));