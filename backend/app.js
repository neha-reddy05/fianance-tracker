const express = require('express');
const app = express();
const cors = require('cors'); // assuming you need this for your frontend
const userRoutes = require('./routes/userRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS

// Routes
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);

// Export the app
module.exports = app;