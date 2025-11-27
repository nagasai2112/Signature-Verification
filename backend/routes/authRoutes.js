const express = require('express');
const { signup, login, changePassword, getUserData } = require('../controllers/authControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/user', protect, getUserData);
router.post('/change-password', protect, changePassword);

module.exports = router;
