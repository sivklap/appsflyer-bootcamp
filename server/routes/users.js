const express = require("express");
const router = express.Router();
const { 
  getAllUsers, 
  getUserById, 
  getMentors, 
  getMentees,
  createUser,
  updateUser,
  deleteUser
} = require("../services/usersService");
const { authenticateToken } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 100;
    const users = await getAllUsers(limit);
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: "Failed to fetch users", message: error.message });
  }
});

router.get("/mentors", async (req, res) => {
  try {
    const mentors = await getMentors();
    res.json(mentors);
  } catch (error) {
    console.error('Get mentors error:', error);
    res.status(500).json({ error: "Failed to fetch mentors", message: error.message });
  }
});

router.get("/mentors/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user || user.role !== 'mentor') {
      return res.status(404).json({ error: "Mentor not found" });
    }
    res.json(user);
  } catch (error) {
    console.error('Get mentor error:', error);
    res.status(500).json({ error: "Failed to fetch mentor", message: error.message });
  }
});

router.get("/mentees", async (req, res) => {
  try {
    const mentees = await getMentees();
    res.json(mentees);
  } catch (error) {
    console.error('Get mentees error:', error);
    res.status(500).json({ error: "Failed to fetch mentees", message: error.message });
  }
});

// Protected routes (require authentication)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: "Failed to fetch user", message: error.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json({ id: result.id });
  } catch (error) {
    console.error('Create user error:', error);
    if (error.code === "23505") return res.status(409).json({ error: "Email already exists" });
    if (error.code === "23514") return res.status(400).json({ error: "Invalid role" });
    res.status(400).json({ error: error.message });
  }
});

router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    if (error.code === "23505") return res.status(409).json({ error: "Email already exists" });
    if (error.code === "23514") return res.status(400).json({ error: "Invalid role" });
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: "Failed to delete user", message: error.message });
  }
});

module.exports = router;
