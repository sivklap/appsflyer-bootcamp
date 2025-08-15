const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail, getUserById, updateUser } = require("./usersService");

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Object} - User object and JWT token
   */
  async signup(userData) {
    const {
      first_name, last_name, email, password, role = "mentee",
      phone_number = "", bio = "", linkedin_url = "", img = "",
      languages = [], years_of_experience = 0
    } = userData;

    const userRegistrationData = {
      first_name,
      last_name,
      email,
      passwordHash: password,
      role,
      phone_number,
      bio,
      linkedin_url,
      img,
      languages,
      years_of_experience
    };

    const user = await createUser(userRegistrationData);
    console.log('User created successfully:', user.first_name, user.last_name);

    // Generate JWT token
    const token = this.generateToken(user);

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    return { user: userResponse, token };
  }

  /**
   * Authenticate user login
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object} - User object and JWT token
   */
  async login(email, password) {
    const user = await findUserByEmail(email);
    if (!user) {
      console.log('Login failed: User not found for email:', email);
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('Login failed: Invalid password for email:', email);
      throw new Error('Invalid credentials');
    }

    console.log('Login successful for user:', user.first_name, user.last_name);

    const token = this.generateToken(user);

    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    return { user: userResponse, token };
  }

  /**
   * Get user profile by ID
   * @param {string} userId - User ID
   * @returns {Object} - User profile
   */
  async getProfile(userId) {
    console.log('GET /api/auth/profile - Request received for user ID:', userId);
    const user = await getUserById(userId);
    console.log('Profile fetched successfully for user:', user.first_name, user.last_name);
    return user;
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Object} - Updated user profile
   */
  async updateProfile(userId, updateData) {
    console.log('PATCH /api/auth/update-profile - Request received for user ID:', userId);
    console.log('Update data:', updateData);
    
    const user = await updateUser(userId, updateData);
    if (!user) {
      console.log('User not found for update, ID:', userId);
      throw new Error('User not found');
    }
    console.log('Profile updated successfully:', user.first_name, user.last_name);
    return user;
  }

  /**
   * Generate JWT token for user
   * @param {Object} user - User object
   * @returns {string} - JWT token
   */
  generateToken(user) {
    return jwt.sign(
      { sub: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
  }

  /**
   * Verify JWT token
   * @param {string} token - JWT token
   * @returns {Object} - Decoded token payload
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = new AuthService();
