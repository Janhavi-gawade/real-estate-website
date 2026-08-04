require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for testing
app.get('/', (req, res) => {
  res.send('Backend Server is running!');
});

// Serverless MongoDB Connection Caching
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  // If no connection exists, connect to MongoDB
  const db = await mongoose.connect(process.env.MONGODB_URI);
  cachedDb = db;
  console.log('Successfully connected to MongoDB Atlas!');
  return db;
};

// Connect to database before handling any API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    res.status(500).json({ message: `DB Error: ${error.message}` });
  }
});

// API Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start local dev server if not in production

// Start local dev server if not in production
if (process.env.NODE_ENV !== 'production') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
}

// Export the app for Vercel Serverless
module.exports = app;
