
const router = require("express").Router();
const routes = require("../config/routes");
const { authenticateToken } = require("../middleware/auth");
const authService = require("../services/authService");
const multer = require('multer');

const validator = require('validator');
const upload = multer();

// Add request logging middleware
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

router.post(routes.auth.signup, upload.single('img'), async (req, res) => {
  try {
    const userData = { ...req.body };
  // --- Sanitization & Validation ---
  // Sanitize text fields
  if (userData.first_name) userData.first_name = validator.escape(validator.trim(userData.first_name));
  if (userData.last_name) userData.last_name = validator.escape(validator.trim(userData.last_name));
  if (userData.bio) userData.bio = validator.escape(validator.trim(userData.bio));
  if (userData.linkedin_url) userData.linkedin_url = validator.trim(userData.linkedin_url);
  if (userData.phone_number) userData.phone_number = validator.trim(userData.phone_number);
    // Password length
    if (!userData.password || userData.password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }
    // Phone format (optional, only if provided)
    if (userData.phone_number && !/^\+?\d{7,15}$/.test(userData.phone_number)) {
      return res.status(400).json({ error: 'Invalid phone number format.' });
    }
    // LinkedIn URL (optional, only if provided)
    if (userData.linkedin_url && !/^https:\/\/(www\.)?linkedin\.com\/.+/.test(userData.linkedin_url)) {
      return res.status(400).json({ error: 'Invalid LinkedIn URL.' });
    }
    // Image validation (if file uploaded)
    if (req.file) {
      if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Uploaded file must be an image.' });
      }
      if (req.file.size > 2 * 1024 * 1024) { // 2MB limit
        return res.status(400).json({ error: 'Image file too large (max 2MB).' });
      }
      userData.img = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    } else if (userData.img && Array.isArray(userData.img)) {
      userData.img = userData.img[0];
    }
    // --- End Validation ---
    const result = await authService.signup(userData);
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

router.patch(routes.auth.updateProfile, authenticateToken, upload.single('img'), async (req, res) => {
  try {
    const userData = { ...req.body };
    if (req.file) {
      userData.img = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    } else if (userData.img && Array.isArray(userData.img)) {
      userData.img = userData.img[0];
    }
    const user = await authService.updateProfile(req.user.sub, userData);
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
