const express = require("express");
const router = express.Router();
const routes = require("../config/routes");
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

// Add request logging middleware for this router
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Query:`, req.query);
  next();
});

router.get(routes.users.all, async (req, res) => {
  console.log('GET /users - Request received');
  try {
    const limit = Number(req.query.limit) || 100;
    console.log('Fetching users with limit:', limit);

    const users = await getAllUsers(limit);
    console.log('Users fetched successfully:', users.length);

    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: "Failed to fetch users", message: error.message });
  }
});

router.get(routes.users.mentors, async (req, res) => {
  console.log('GET /users/mentors - Request received');
  try {
    const mentors = await getMentors();
    console.log('Mentors fetched successfully:', mentors.length);
    res.json(mentors);
  } catch (error) {
    console.error('Get mentors error:', error);
    res.status(500).json({ error: "Failed to fetch mentors", message: error.message });
  }
});

router.get(routes.users.mentees, async (req, res) => {
  console.log('GET /users/mentees - Request received');
  try {
    const mentees = await getMentees();
    console.log('Mentees fetched successfully:', mentees.length);
    res.json(mentees);
  } catch (error) {
    console.error('Get mentees error:', error);
    res.status(500).json({ error: "Failed to fetch mentees", message: error.message });
  }
});

// Protected routes (require authentication)
router.get(routes.users.byId(':id'), authenticateToken, async (req, res) => {
  console.log(' GET /users/:id - Request received, ID:', req.params.id);
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      console.log('User not found for ID:', req.params.id);
      return res.status(404).json({ error: "User not found" });
    }
    console.log('User fetched successfully:', user.firstName, user.lastName);
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: "Failed to fetch user", message: error.message });
  }
});

router.post(routes.users.all, authenticateToken, async (req, res) => {
  console.log('POST /users - Request received');
  console.log(' User data:', { ...req.body, password: '[HIDDEN]' });
  try {
    const result = await createUser(req.body);
    console.log('User created successfully, ID:', result._id);
    res.status(201).json({ id: result._id });
  } catch (error) {
    console.error('Create user error:', error);
    if (error.message === 'Email already exists') return res.status(409).json({ error: "Email already exists" });
    res.status(400).json({ error: error.message });
  }
});

router.patch(routes.users.byId(':id'), authenticateToken, async (req, res) => {
  console.log(' PATCH /users/:id - Request received, ID:', req.params.id);
  console.log(' Update data:', req.body);
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) {
      console.log('User not found for update, ID:', req.params.id);
      return res.status(404).json({ error: "User not found" });
    }
    console.log('User updated successfully:', user.firstName, user.lastName);
    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    if (error.message === 'Email already exists') return res.status(409).json({ error: "Email already exists" });
    res.status(400).json({ error: error.message });
  }
});

router.delete(routes.users.byId(':id'), authenticateToken, async (req, res) => {
  console.log('DELETE /users/:id - Request received, ID:', req.params.id);
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) {
      console.log('User not found for deletion, ID:', req.params.id);
      return res.status(404).json({ error: "User not found" });
    }
    console.log('User deleted successfully, ID:', req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: "Failed to delete user", message: error.message });
  }
});

module.exports = router;
