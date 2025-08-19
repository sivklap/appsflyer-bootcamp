const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail, getUserById, updateUser } = require("./usersService");

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
  async signup(userData) {
    const {
      first_name, last_name, email, password, role = "mentee",
      phone_number = "", bio = "", linkedin_url = "", img = "",
      languages = [], years_of_experience = 0, is_available = true
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
      years_of_experience,
      is_available
    };

    const user = await createUser(userRegistrationData);
    console.log('User created successfully:', user.first_name, user.last_name, 'Available:', user.is_available);
    
    const token = this.generateToken(user);

    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    return { user: userResponse, token };
  }

  async login(email, password) {
    const user = await findUserByEmail(email);
    if (!user) {
      console.log('Login failed: User not found with email:', email);
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

  async getProfile(userId) {
    console.log('GET /auth/profile - Request received for user ID:', userId);
    const user = await getUserById(userId);
    console.log('Profile fetched successfully for user:', user.first_name, user.last_name);
    return user;
  }

  async updateProfile(userId, updateData) {
    console.log('PATCH /auth/update-profile - Request received for user ID:', userId);
    console.log('Update data:', updateData);
    
    // Ensure is_available is included in the update if provided
    if (updateData.is_available !== undefined) {
      console.log('Updating availability status to:', updateData.is_available);
    }
    
    const user = await updateUser(userId, updateData);
    if (!user) {
      console.log('User not found for update, ID:', userId);
      throw new Error('User not found');
    }
    console.log('Profile updated successfully:', user.first_name, user.last_name);
    return user;
  }

  generateToken(user) {
    return jwt.sign(
      { sub: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  authenticateToken() {
    return (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

      if (!token) {
        return res.status(401).json({ error: 'Access token required' });
      }

      try {
        const decoded = this.verifyToken(token);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
      }
    };
  }
}

module.exports = new AuthService();
