const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateToken, requireAdmin, requireApprovedUser } = require('../utils/auth');
const { validateUserApproval, validateProfileUpdate } = require('../utils/validation');

// Admin only routes
router.get('/pending', authenticateToken, requireAdmin, UserController.getPendingUsers);
router.get('/approved', authenticateToken, requireAdmin, UserController.getApprovedUsers);
router.get('/stats', authenticateToken, requireAdmin, UserController.getUserStats);
router.get('/search', authenticateToken, requireAdmin, UserController.searchUsers);
router.post('/:id/approve-reject', authenticateToken, requireAdmin, validateUserApproval, UserController.approveRejectUser);
router.delete('/:id', authenticateToken, requireAdmin, UserController.deleteUser);

// Admin and approved user routes
router.get('/:id', authenticateToken, requireApprovedUser, UserController.getUserById);

// User profile routes (authenticated users only)
router.get('/profile', authenticateToken, UserController.getProfile);
router.put('/profile', authenticateToken, validateProfileUpdate, UserController.updateProfile);

module.exports = router;