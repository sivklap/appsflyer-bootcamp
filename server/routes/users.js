const express = require("express");
const router = express.Router();
const { getAllUsers, addUser } = require("../services/usersService");

// GET /api/users - Get all users
router.get("/", (req, res) => {
  const users = getAllUsers();
  res.json(users);
});

// POST /api/users - Add a new user (mentor/mentee)
router.post("/", (req, res) => {
  const user = req.body;
  if (!user || !user.firstName || !user.lastName || !user.email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newUser = addUser(user);
  res.status(201).json(newUser);
});

module.exports = router;
