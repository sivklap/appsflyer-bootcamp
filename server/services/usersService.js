const { users } = require("../data/usersData");

function getAllUsers() {
  // In a real application, this would fetch data from a database
  return users;
}


module.exports = {
  getAllUsers
};

