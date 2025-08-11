
const fs = require('fs');
const path = require('path');
const DATA_PATH = path.join(__dirname, '../data/usersData.json');

function readUsers() {
  if (!fs.existsSync(DATA_PATH)) return [];
  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  return data ? JSON.parse(data) : [];
}

function writeUsers(users) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2));
}

function addUser(user) {
  const users = readUsers();
  user.id = Date.now();
  users.push(user);
  writeUsers(users);
  return user;
}

function getAllUsers() {
  return readUsers();
}

module.exports = {
  getAllUsers,
  addUser
};
