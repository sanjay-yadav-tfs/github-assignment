const { User } = require('../models');
const { Op } = require('sequelize');
const logger = require('../utils/logger');
const QueueService = require('./QueueService');

class UserService {
  static async getAllPendingUsers() {
    try {
      const users = await User.findPendingUsers();
      return users;
    } catch (error) {
      logger.error('Get pending users error:', error);
      throw error;
    }
  }

  static async getAllApprovedUsers() {
    try {
      const users = await User.findApprovedUsers();
      return users;
    } catch (error) {
      logger.error('Get approved users error:', error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findByPk(id, {
        include: [
          {
            model: User,
            as: 'approver',
            attributes: ['id', 'firstName', 'lastName', 'email'],
          },
        ],
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      logger.error('Get user by ID error:', error);
      throw error;
    }
  }

  static async approveUser(userId, adminId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      if (user.status !== 'PENDING') {
        throw new Error('User is not in pending status');
      }

      await user.update({
        status: 'APPROVED',
        approvedBy: adminId,
        approvedAt: new Date(),
        rejectionReason: null,
      });

      // Add approval notification job to queue
      await QueueService.addApprovalNotificationJob({
        userId: user.id,
        userEmail: user.email,
        userName: `${user.firstName} ${user.lastName}`,
        action: 'approved',
        adminId,
      });

      logger.info(`User approved: ${user.email} by admin ID: ${adminId}`);
      return user;
    } catch (error) {
      logger.error('Approve user error:', error);
      throw error;
    }
  }

  static async rejectUser(userId, adminId, rejectionReason) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      if (user.status !== 'PENDING') {
        throw new Error('User is not in pending status');
      }

      await user.update({
        status: 'REJECTED',
        approvedBy: adminId,
        approvedAt: new Date(),
        rejectionReason,
      });

      // Add rejection notification job to queue
      await QueueService.addApprovalNotificationJob({
        userId: user.id,
        userEmail: user.email,
        userName: `${user.firstName} ${user.lastName}`,
        action: 'rejected',
        rejectionReason,
        adminId,
      });

      logger.info(`User rejected: ${user.email} by admin ID: ${adminId}`);
      return user;
    } catch (error) {
      logger.error('Reject user error:', error);
      throw error;
    }
  }

  static async updateUserProfile(userId, updateData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Only allow updating certain fields
      const allowedFields = ['firstName', 'lastName', 'phone', 'dateOfBirth', 'profilePicture'];
      const filteredData = {};
      
      for (const field of allowedFields) {
        if (updateData[field] !== undefined) {
          filteredData[field] = updateData[field];
        }
      }

      await user.update(filteredData);
      logger.info(`User profile updated: ${user.email}`);
      
      return user;
    } catch (error) {
      logger.error('Update user profile error:', error);
      throw error;
    }
  }

  static async searchUsers(query, filters = {}) {
    try {
      const whereClause = {};

      // Add text search
      if (query) {
        whereClause[Op.or] = [
          { firstName: { [Op.like]: `%${query}%` } },
          { lastName: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
        ];
      }

      // Add filters
      if (filters.status) {
        whereClause.status = filters.status;
      }

      if (filters.role) {
        whereClause.role = filters.role;
      }

      if (filters.dateFrom) {
        whereClause.createdAt = {
          [Op.gte]: new Date(filters.dateFrom),
        };
      }

      if (filters.dateTo) {
        whereClause.createdAt = {
          ...whereClause.createdAt,
          [Op.lte]: new Date(filters.dateTo),
        };
      }

      const users = await User.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']],
        limit: filters.limit || 50,
        offset: filters.offset || 0,
      });

      return users;
    } catch (error) {
      logger.error('Search users error:', error);
      throw error;
    }
  }

  static async getUserStats() {
    try {
      const stats = await Promise.all([
        User.count({ where: { status: 'PENDING', role: 'USER' } }),
        User.count({ where: { status: 'APPROVED', role: 'USER' } }),
        User.count({ where: { status: 'REJECTED', role: 'USER' } }),
        User.count({ where: { role: 'USER' } }),
      ]);

      return {
        pending: stats[0],
        approved: stats[1],
        rejected: stats[2],
        total: stats[3],
      };
    } catch (error) {
      logger.error('Get user stats error:', error);
      throw error;
    }
  }
}

module.exports = UserService;