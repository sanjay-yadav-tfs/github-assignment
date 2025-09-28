const UserService = require('../services/UserService');
const logger = require('../utils/logger');

class UserController {
  static async getPendingUsers(req, res) {
    try {
      const users = await UserService.getAllPendingUsers();
      
      res.status(200).json({
        success: true,
        message: 'Pending users retrieved successfully',
        data: {
          users,
          count: users.length,
        },
      });
    } catch (error) {
      logger.error('Get pending users controller error:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve pending users',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async getApprovedUsers(req, res) {
    try {
      const users = await UserService.getAllApprovedUsers();
      
      res.status(200).json({
        success: true,
        message: 'Approved users retrieved successfully',
        data: {
          users,
          count: users.length,
        },
      });
    } catch (error) {
      logger.error('Get approved users controller error:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve approved users',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: {
          user,
        },
      });
    } catch (error) {
      logger.error('Get user by ID controller error:', error);
      
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: 'Failed to retrieve user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async approveRejectUser(req, res) {
    try {
      const { id } = req.params;
      const { action, rejectionReason } = req.body;
      const adminId = req.user.id;

      let result;
      
      if (action === 'approve') {
        result = await UserService.approveUser(id, adminId);
      } else if (action === 'reject') {
        if (!rejectionReason) {
          return res.status(400).json({
            success: false,
            message: 'Rejection reason is required',
          });
        }
        result = await UserService.rejectUser(id, adminId, rejectionReason);
      }

      res.status(200).json({
        success: true,
        message: `User ${action}d successfully`,
        data: {
          user: result,
        },
      });
    } catch (error) {
      logger.error('Approve/Reject user controller error:', error);
      
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      if (error.message === 'User is not in pending status') {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: 'Failed to process user approval/rejection',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserService.getUserById(userId);
      
      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: user,
      });
    } catch (error) {
      logger.error('Get profile controller error:', error);
      
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: 'Failed to retrieve profile',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const updateData = req.body;

      const user = await UserService.updateUserProfile(userId, updateData);
      
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          user,
        },
      });
    } catch (error) {
      logger.error('Update profile controller error:', error);
      
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: 'Failed to update profile',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async searchUsers(req, res) {
    try {
      const { q: query, status, role, dateFrom, dateTo, limit = 50, offset = 0 } = req.query;
      
      const filters = {
        status,
        role,
        dateFrom,
        dateTo,
        limit: parseInt(limit),
        offset: parseInt(offset),
      };

      const users = await UserService.searchUsers(query, filters);
      
      res.status(200).json({
        success: true,
        message: 'Users search completed successfully',
        data: {
          users,
          count: users.length,
          query,
          filters,
        },
      });
    } catch (error) {
      logger.error('Search users controller error:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to search users',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async getUserStats(req, res) {
    try {
      const stats = await UserService.getUserStats();
      
      res.status(200).json({
        success: true,
        message: 'User statistics retrieved successfully',
        data: {
          stats,
        },
      });
    } catch (error) {
      logger.error('Get user stats controller error:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve user statistics',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const adminId = req.user.id;

      const user = await UserService.getUserById(id);
      
      if (user.role === 'ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Cannot delete admin users',
        });
      }

      await user.destroy();
      
      logger.info(`User deleted: ${user.email} by admin ID: ${adminId}`);

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      logger.error('Delete user controller error:', error);
      
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: 'Failed to delete user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }
}

module.exports = UserController;