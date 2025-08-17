const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const routes = require("../config/routes");
const { createUser, findUserByEmail, getUserById, updateUser } = require("../services/usersService");
const { authenticateToken } = require("../middleware/auth");


const JWT_SECRET = process.env.JWT_SECRET;

// Add request logging middleware
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

router.post(routes.auth.signup, async (req, res) => {
  try {
    console.log('Signup request body:', req.body);
    const {
      first_name, last_name, email, password, role = "mentee",
      phone_number = "", bio = "", linkedin_url = "", img = "",
      languages = [], years_of_experience = 0
    } = req.body;

    // Ensure password is mapped to passwordHash for mongoose pre-save hook
    const userData = {
      first_name,
      last_name,
      email,
      passwordHash: password, // This will be hashed by the pre-save hook
      role,
      phone_number,
      bio,
      linkedin_url,
      img,
      languages,
      years_of_experience
    };

    const user = await createUser(userData);
    console.log('User created successfully:', user.first_name, user.last_name);

    // Generate JWT token
    const token = jwt.sign(
      { sub: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    res.status(201).json({ user: userResponse, token });
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

    const user = await findUserByEmail(email);
    if (!user) {
      console.log('Login failed: User not found for email:', email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('Login failed: Invalid password for email:', email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log('Login successful for user:', user.first_name, user.last_name);

    const token = jwt.sign(
      { sub: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    res.json({ user: userResponse, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get(routes.auth.profile, authenticateToken, async (req, res) => {
  console.log('GET /api/auth/profile - Request received for user ID:', req.user.sub);
  try {
    const user = await getUserById(req.user.sub);
    console.log('Profile fetched successfully for user:', user.first_name, user.last_name);
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

router.patch(routes.auth.updateProfile, authenticateToken, async (req, res) => {
  console.log('PATCH /api/auth/update-profile - Request received for user ID:', req.user.sub);
  console.log('Update data:', req.body);
  
  try {
    const user = await updateUser(req.user.sub, req.body);
    if (!user) {
      console.log('User not found for update, ID:', req.user.sub);
      return res.status(404).json({ error: "User not found" });
    }
    console.log('Profile updated successfully:', user.first_name, user.last_name);
    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    if (error.message === 'Email already exists') {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
