const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../services/usersService");

// GET /api/users - Get all users
router.get("/", (req, res) => {
  const users = getAllUsers();
  res.json(users);
});

// GET /api/users/:id - Get user by ID
router.get("/:id", (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// POST /api/users - Create new user
router.post("/", (req, res) => {
  const { name, email, role } = req.body;
  const result = createUser({ name, email, role });

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  res.status(201).json(result.user);
});

// PUT /api/users/:id - Update user
router.put("/:id", (req, res) => {
  const { name, email, role } = req.body;
  const result = updateUser({
    userId: req.params.id,
    name,
    email,
    role,
  });

  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }

  res.json(result.user);
});

// DELETE /api/users/:id - Delete user
router.delete("/:id", (req, res) => {
  const result = deleteUser(req.params.id);

  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }

  res.status(204).send();
});

module.exports = router;
