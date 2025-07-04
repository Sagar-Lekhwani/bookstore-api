// models/bookModel.js
const fs = require('fs').promises;
const path = require('path');
const booksPath = path.join(__dirname, '../data/books.json');

const book = {
  async getAllBooks() {
    const data = await fs.readFile(booksPath, 'utf-8');
    return JSON.parse(data || '[]');
  },

  async saveBooks(books) {
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  }
};

module.exports = book;
