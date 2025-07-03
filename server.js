// server.js
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000; // fallback if .env not set

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('📚 Bookstore API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
