const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Create Express application
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://root:V%40xNNT8hvHhMHGL@cluster0.qtyydwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB database connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const itemRoutes = require('./routes/items');

// Use routes
app.use('/api/items', itemRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'MERN CRUD API server running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Set server port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});