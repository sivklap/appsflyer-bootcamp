const express = require("express");
const router = express.Router();

// Mock data - in a real app, this would be a database
let users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user" },
  { id: 3, name: "Carol Davis", email: "carol@example.com", role: "user" },
];

// GET /api/users - Get all users
router.get("/", (req, res) => {
  res.json(users);
});

// GET /api/users/:id - Get user by ID
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// POST /api/users - Create new user
router.post("/", (req, res) => {
  const { name, email, role = "user" } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser = {
    id: Math.max(...users.map((u) => u.id)) + 1,
    name,
    email,
    role,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id - Update user
router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, email, role } = req.body;
  users[userIndex] = { ...users[userIndex], name, email, role };

  res.json(users[userIndex]);
});

// DELETE /api/users/:id - Delete user
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = router;
