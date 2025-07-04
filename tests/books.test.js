const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../server');

const userFile = path.join(__dirname, '../data/users.json');
const bookFile = path.join(__dirname, '../data/books.json');

let token = '';
let bookId = '';

beforeAll(async () => {
  // Clear data files
  fs.writeFileSync(userFile, '[]');
  fs.writeFileSync(bookFile, '[]');

  // Register a test user
  await request(app).post('/api/register').send({
    email: 'bookuser@example.com',
    password: '123456'
  });

  // Login and store token
  const loginRes = await request(app).post('/api/login').send({
    email: 'bookuser@example.com',
    password: '123456'
  });

  token = loginRes.body.token;
});

describe('Books API Tests', () => {
  it('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Book',
        author: 'Test Author',
        genre: 'Fiction',
        publishedYear: 2022
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Book');

    bookId = res.body.id; // Save for later tests
  });

  it('should fetch all books', async () => {
    const res = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should fetch a book by ID', async () => {
    const res = await request(app)
      .get(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', bookId);
  });
});
