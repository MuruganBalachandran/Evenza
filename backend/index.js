require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server start error: ${error.message}`);
    process.exit(1);
  }
};

startServer();