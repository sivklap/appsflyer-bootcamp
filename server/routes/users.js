const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../services/usersService");

// GET /api/users - Get all users
router.get("/", (req, res) => {
  const users = getAllUsers();
  res.json(users);
});

module.exports = router;
