const authService = require("../services/authService");

module.exports = {
  authenticateToken: authService.authenticateToken()
};
