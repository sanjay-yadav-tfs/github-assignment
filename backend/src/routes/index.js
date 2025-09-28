const express = require('express');
const router = express.Router();
const QueueService = require('../services/QueueService');
const { authenticateToken, requireAdmin } = require('../utils/auth');

// Import route modules
const authRoutes = require('./auth');
const userRoutes = require('./users');

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      type: process.env.DB_DIALECT || 'sqlite',
      persistent: process.env.DB_PERSISTENT === 'true',
      location: process.env.DB_NAME || 'database/persistent_user_onboarding.db'
    }
  });
});

// Database status route (admin only)
router.get('/database/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const PersistentDBManager = require('../config/persistentDB');
    const dbManager = new PersistentDBManager();
    const stats = await dbManager.getStats();
    
    res.status(200).json({
      success: true,
      message: 'Database status retrieved successfully',
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve database status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// Queue monitoring route (admin only)
router.get('/queue/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const stats = await QueueService.getQueueStats();
    
    res.status(200).json({
      success: true,
      message: 'Queue statistics retrieved successfully',
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve queue statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// API info route
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User Onboarding & Approval Platform API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        adminLogin: 'POST /api/auth/admin/login',
        profile: 'GET /api/auth/profile',
        logout: 'POST /api/auth/logout',
        refreshToken: 'POST /api/auth/refresh-token',
      },
      users: {
        pending: 'GET /api/users/pending (admin)',
        approved: 'GET /api/users/approved (admin)',
        stats: 'GET /api/users/stats (admin)',
        search: 'GET /api/users/search (admin)',
        approveReject: 'POST /api/users/:id/approve-reject (admin)',
        getUser: 'GET /api/users/:id',
        updateProfile: 'PUT /api/users/profile',
        deleteUser: 'DELETE /api/users/:id (admin)',
      },
      system: {
        health: 'GET /api/health',
        queueStats: 'GET /api/queue/stats (admin)',
      },
    },
  });
});

module.exports = router;