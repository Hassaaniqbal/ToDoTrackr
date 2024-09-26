const express = require('express');
const { getCurrentUser } = require('../controllers/userController');
const { protect } = require('../middleware/auth');  // Import protect middleware

const router = express.Router();

// Get current user
router.get('/me', protect, getCurrentUser);

module.exports = router;
