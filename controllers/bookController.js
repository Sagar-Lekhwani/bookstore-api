// controllers/bookController.js
const { v4: uuidv4 } = require('uuid');
const book = require('../models/bookModel');

const books = {
  async getAll(req, res) {
    const booksData = await book.getAllBooks();
    res.json(booksData);
  },

  async getById(req, res) {
    const booksData = await book.getAllBooks();
    const found = booksData.find(b => b.id === req.params.id);
    if (!found) return res.status(404).json({ error: 'Book not found' });
    res.json(found);
  },

  async create(req, res) {
    const { title, author, genre, publishedYear } = req.body;
    if (!title || !author || !genre || !publishedYear)
      return res.status(400).json({ error: 'All fields are required' });

    const booksData = await book.getAllBooks();
    const newBook = {
      id: uuidv4(),
      title,
      author,
      genre,
      publishedYear,
      userId: req.user.id
    };

    booksData.push(newBook);
    await book.saveBooks(booksData);

    res.status(201).json(newBook);
  },

  async update(req, res) {
    const booksData = await book.getAllBooks();
    const index = booksData.findIndex(b => b.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: 'Book not found' });
    if (booksData[index].userId !== req.user.id)
      return res.status(403).json({ error: 'Forbidden - Not your book' });

    const { title, author, genre, publishedYear } = req.body;
    booksData[index] = {
      ...booksData[index],
      title,
      author,
      genre,
      publishedYear
    };

    await book.saveBooks(booksData);
    res.json(booksData[index]);
  },

  async remove(req, res) {
    let booksData = await book.getAllBooks();
    const found = booksData.find(b => b.id === req.params.id);

    if (!found) return res.status(404).json({ error: 'Book not found' });
    if (found.userId !== req.user.id)
      return res.status(403).json({ error: 'Forbidden - Not your book' });

    booksData = booksData.filter(b => b.id !== req.params.id);
    await book.saveBooks(booksData);
    res.json({ message: 'Book deleted successfully' });
  }
};

module.exports = books;
