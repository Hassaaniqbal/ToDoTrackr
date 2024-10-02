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
// Helper function to create a JWT token and send it via cookie
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Cookie options for the JWT token
  const cookieOptions = {
    expires: new Date(
      Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Prevents the cookie from being accessed by client-side JavaScript
  };

  // Add secure flag for production (only send cookies via HTTPS)
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  // Send the JWT token as a cookie
  res.cookie('jwt', token, cookieOptions);

  // Cookie options for the username
  const usernameCookieOptions = {
    expires: new Date(
      Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: false, // Allow access to this cookie via client-side JavaScript
  };

  // Send the username as a cookie
  res.cookie('username', user.username, usernameCookieOptions);

  // Remove the password from the output
  user.password = undefined;

  // Send the token and user data
  res.status(statusCode).json({
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

  // Send token via cookie and response
  createSendToken(newUser, 201, res);
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

  // 3) If everything is okay, send token via cookie and response
  createSendToken(user, 200, res);
});
