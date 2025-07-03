// models/userModel.js
const fs = require('fs').promises;
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');

const user = {
  async getAllUsers() {
    const data = await fs.readFile(usersPath, 'utf-8');
    return JSON.parse(data);
  },

  async saveUsers(users) {
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  }
};

module.exports = user;
