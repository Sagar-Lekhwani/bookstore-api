// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

const auth = {
  async register(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email & password required' });

    const users = await user.getAllUsers();
    const existing = users.find(u => u.email === email);
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    users.push({ id: Date.now().toString(), email, password: hashed });
    await user.saveUsers(users);

    res.status(201).json({ message: 'User registered successfully' });
  },

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email & password required' });

    const users = await user.getAllUsers();
    const existing = users.find(u => u.email === email);
    if (!existing) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: existing.id, email: existing.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  }
};

module.exports = auth;
