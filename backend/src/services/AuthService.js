const jwt = require('jsonwebtoken');
const { User } = require('../models');
const jwtConfig = require('../config/jwt');
const logger = require('../utils/logger');

class AuthService {
  static async register(userData) {
    try {
      // Check if user already exists
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const user = await User.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        dateOfBirth: userData.dateOfBirth,
        role: 'USER',
        status: 'PENDING',
      });

      logger.info(`New user registered: ${user.email}`);

      return {
        user: user.toJSON(),
        message: 'Registration successful. Your account is pending approval.',
      };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  static async login(email, password) {
    try {
      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Update last login
      await user.update({ lastLoginAt: new Date() });

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
        },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );

      logger.info(`User logged in: ${user.email}`);

      return {
        user: user.toJSON(),
        token,
        expiresIn: jwtConfig.expiresIn,
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  static async adminLogin(email, password) {
    try {
      // Find admin user
      const admin = await User.findOne({
        where: {
          email,
          role: 'ADMIN',
        },
      });

      if (!admin) {
        throw new Error('Invalid admin credentials');
      }

      // Check password
      const isPasswordValid = await admin.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error('Invalid admin credentials');
      }

      // Update last login
      await admin.update({ lastLoginAt: new Date() });

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: admin.id,
          email: admin.email,
          role: admin.role,
          status: admin.status,
        },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );

      logger.info(`Admin logged in: ${admin.email}`);

      return {
        user: admin.toJSON(),
        token,
        expiresIn: jwtConfig.expiresIn,
      };
    } catch (error) {
      logger.error('Admin login error:', error);
      throw error;
    }
  }

  static async createAdminUser(adminData) {
    try {
      const existingAdmin = await User.findByEmail(adminData.email);
      if (existingAdmin) {
        throw new Error('Admin user already exists');
      }

      const admin = await User.create({
        firstName: adminData.firstName || 'Admin',
        lastName: adminData.lastName || 'User',
        email: adminData.email,
        password: adminData.password,
        role: 'ADMIN',
        status: 'APPROVED',
      });

      logger.info(`Admin user created: ${admin.email}`);
      return admin.toJSON();
    } catch (error) {
      logger.error('Create admin error:', error);
      throw error;
    }
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

module.exports = AuthService;