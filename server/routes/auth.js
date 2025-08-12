const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail, getUserById } = require("../services/usersService");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

router.post("/signup", async (req, res) => {
  try {
    const {
      firstName, lastName, email, password, phone,
      role = "mentee", bio, linkedinUrl, imageUrl,
      codingLanguages, specialtyFields
    } = req.body;

    // Create user with password (will be hashed by the model)
    const userData = {
      firstName,
      lastName,
      email,
      passwordHash: password, // Will be hashed by the model
      phone: phone || null,
      role,
      bio: bio || null,
      linkedinUrl: linkedinUrl || null,
      imageUrl: imageUrl || null,
      codingLanguages: codingLanguages || [],
      specialtyFields: specialtyFields || []
    };

    const user = await createUser(userData);
    
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
    if (error.message === 'Email already exists') {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { sub: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    res.json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

const { authenticateToken } = require("../middleware/auth");

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.user.sub);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;
