const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const authRoutes = require('./routes/authRoute');
const bookRoutes = require('./routes/bookRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
// const logger = require('./middlewares/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(logger);

app.use('/api', authRoutes);
app.use('/api/books', authMiddleware, bookRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ Only listen when NOT running tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

module.exports = app; // ✅ Export for Jest
