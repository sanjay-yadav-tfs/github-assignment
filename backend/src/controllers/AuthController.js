const AuthService = require('../services/AuthService');
const logger = require('../utils/logger');

class AuthController {
  static async register(req, res) {
    try {
      const result = await AuthService.register(req.body);
      
      res.status(201).json({
        success: true,
        message: result.message,
        data: {
          user: result.user,
        },
      });
    } catch (error) {
      logger.error('Registration controller error:', error);
      
      if (error.message === 'User with this email already exists') {
        return res.status(409).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: result.user,
          token: result.token,
          expiresIn: result.expiresIn,
        },
      });
    } catch (error) {
      logger.error('Login controller error:', error);
      
      if (error.message === 'Invalid email or password') {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: 'Login failed',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async adminLogin(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.adminLogin(email, password);
      
      res.status(200).json({
        success: true,
        message: 'Admin login successful',
        data: {
          user: result.user,
          token: result.token,
          expiresIn: result.expiresIn,
        },
      });
    } catch (error) {
      logger.error('Admin login controller error:', error);
      
      if (error.message === 'Invalid admin credentials') {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: 'Admin login failed',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async getProfile(req, res) {
    try {
      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: {
          user: req.user.toJSON(),
        },
      });
    } catch (error) {
      logger.error('Get profile controller error:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve profile',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async logout(req, res) {
    try {
      // In a stateless JWT system, logout is typically handled client-side
      // You could implement token blacklisting here if needed
      
      res.status(200).json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      logger.error('Logout controller error:', error);
      
      res.status(500).json({
        success: false,
        message: 'Logout failed',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }

  static async refreshToken(req, res) {
    try {
      // Get current user from middleware
      const user = req.user;
      
      // Generate new token
      const jwt = require('jsonwebtoken');
      const jwtConfig = require('../config/jwt');
      
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

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          token,
          expiresIn: jwtConfig.expiresIn,
        },
      });
    } catch (error) {
      logger.error('Refresh token controller error:', error);
      
      res.status(500).json({
        success: false,
        message: 'Token refresh failed',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }
}

module.exports = AuthController;