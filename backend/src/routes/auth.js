const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { authenticateToken } = require('../utils/auth');
const { validateRegistration, validateLogin } = require('../utils/validation');

// Public routes
router.post('/register', validateRegistration, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.post('/admin/login', validateLogin, AuthController.adminLogin);

// Protected routes
router.get('/profile', authenticateToken, AuthController.getProfile);
router.post('/logout', authenticateToken, AuthController.logout);
router.post('/refresh-token', authenticateToken, AuthController.refreshToken);

module.exports = router;