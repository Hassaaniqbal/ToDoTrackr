const User = require('../models/User');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Helper function to sign JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// SIGNUP CONTROLLER
exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email is already in use', 400)); // Pass error to global error handler
  }

  // Create new user
  const newUser = await User.create({ username, email, password });

  // Generate JWT token
  const token = signToken(newUser._id);

  // Respond with user data and token
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    },
  });
});




// LOGIN CONTROLLER
exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
  
    // 1) Check if username and password exist in the request
    if (!username || !password) {
      return next(new AppError('Please provide username and password', 400));
    }
  
    // 2) Check if user exists & password is correct
    const user = await User.findOne({ username }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect username or password', 401));
    }
  
    // 3) If everything is okay, generate a JWT token
    const token = signToken(user._id);
  
    // 4) Send success response
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  });
  