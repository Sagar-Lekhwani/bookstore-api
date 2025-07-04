// tests/auth.test.js
const request = require('supertest');
const app = require('../server');

describe('Auth Tests', () => {
  const testEmail = 'test@example.com';
  const testPassword = '123456';

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should not register an existing user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(409);
  });
});
