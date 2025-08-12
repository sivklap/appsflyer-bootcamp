const mongoose = require('mongoose');

const User = mongoose.model('User', {}, 'Users');

module.exports = User;