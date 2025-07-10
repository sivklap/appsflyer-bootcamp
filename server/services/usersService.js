const { users } = require("../data/usersData");

function getAllUsers() {
  // In a real application, this would fetch data from a database
  return users;
}

function getUserById(userId) {
  const user = users.find((u) => u.id === parseInt(userId));
  if (!user) {
    return null;
  }
  return user;
}

function createUser({ name, email, role = "user" }) {
  if (!name || !email) {
    return { success: false, error: "Name and email are required" };
  }

  const newUser = {
    id: Math.max(...users.map((u) => u.id)) + 1,
    name,
    email,
    role,
  };

  users.push(newUser);
  return { success: true, user: newUser };
}

function updateUser({ userId, name, email, role }) {
  const userIndex = users.findIndex((u) => u.id === parseInt(userId));

  if (userIndex === -1) {
    return { success: false, error: "User not found" };
  }

  let currUser = users[userIndex];
  currUser = {
    ...currUser,
    name,
    email,
    role,
  };

  users[userIndex] = currUser;
  return { success: true, user: currUser };
}

function deleteUser(userId) {
  const userIndex = users.findIndex((u) => u.id === parseInt(userId));

  if (userIndex === -1) {
    return { success: false, error: "User not found" };
  }

  users.splice(userIndex, 1);
  return { success: true };
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
