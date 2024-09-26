const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

// Controller to fetch current user
const getCurrentUser = async (req, res) => {
  try {
    // The user is already attached to the `req` object by the `protect` middleware
    const user = req.user;

    // Return only necessary user data like username
    res.status(200).json({
      status: 'success',
      data: {
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server Error',
    });
  }
};

module.exports = {
  getCurrentUser,
};
