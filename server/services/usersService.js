const User = require('../models/User');

async function getAllUsers(limit = 100) {
  try {
    const users = await User.find()
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .limit(limit);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id).select('-passwordHash');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getMentors() {
  try {
    const mentors = await User.find({ role: 'mentor' })
      .select('-passwordHash')
      .sort({ createdAt: -1 });
    return mentors;
  } catch (error) {
    throw new Error('Failed to fetch mentors');
  }
}

async function getMentorsById(id) {
  try {
    const mentor = await User.findOne({ _id: id, role: 'mentor' }).select('-passwordHash');
    if (!mentor) {
      throw new Error('Mentor not found');
    }
    return mentor;
  } catch (error) {
    throw error;
  }
}

async function getMentees() {
  try {
    const mentees = await User.find({ role: 'mentee' })
      .select('-passwordHash')
      .sort({ createdAt: -1 });
    return mentees;
  } catch (error) {
    throw new Error('Failed to fetch mentees');
  }
}

async function createUser(userData) {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('Email already exists');
    }
    throw error;
  }
}

async function updateUser(id, userData) {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      userData,
      { new: true, runValidators: true }
    ).select('-passwordHash');
    
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('Email already exists');
    }
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return true;
  } catch (error) {
    throw error;
  }
}

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getMentors,
  getMentorsById,
  getMentees,
  createUser,
  updateUser,
  deleteUser,
  findUserByEmail
};

