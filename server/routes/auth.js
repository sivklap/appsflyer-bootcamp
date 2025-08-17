const router = require("express").Router();
const routes = require("../config/routes");
const { authenticateToken } = require("../middleware/auth");
const authService = require("../services/authService");

// Add request logging middleware
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

router.post(routes.auth.signup, async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Signup error:', error);
    if (error.message === 'Email already exists') {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: error.message });
  }
});

router.post(routes.auth.login, async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    console.error('Login error:', error);
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(500).json({ error: "Login failed" });
  }
});

router.get(routes.auth.profile, authenticateToken, async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.sub);
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

router.patch(routes.auth.updateProfile, authenticateToken, async (req, res) => {
  try {
    const user = await authService.updateProfile(req.user.sub, req.body);
    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    if (error.message === 'Email already exists') {
      return res.status(409).json({ error: "Email already exists" });
    }
    if (error.message === 'User not found') {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
