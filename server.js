const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const authRoutes = require('./routes/authRoute');
// const logger = require('./middlewares/logger');
// const authMiddleware = require('./middlewares/authMiddleware');


// const bookRoutes = require('./routes/bookRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
// app.use(logger);

// Routes
app.use('/api', authRoutes);
// app.use('/api/books', authMiddleware, bookRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
