// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const books = require('../controllers/bookController');

router.get('/', books.getAll);
router.get('/:id', books.getById);
router.post('/', books.create);
router.put('/:id', books.update);
router.delete('/:id', books.remove);

module.exports = router;
