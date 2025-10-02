# Backend Development Guide - User Onboarding & Approval Platform# Backend Development Guide - User Onboarding & Approval Platform



## 🎯 Project Overview## 🎯 Project Overview



A robust Node.js backend API for user onboarding and admin management with JWT authentication, role-based access control, and comprehensive user approval workflows. Built with Express.js, Sequelize ORM, and Azure SQL Database.A robust Node.js backend service for managing user onboarding and approval workflows with admin capabilities. Built with Express.js, Sequelize ORM, and Azure SQL Database integration. Features comprehensive authentication, user management, and role-based access control.



## ✨ Complete Feature Set## ✨ Complete Feature Set



### Authentication Features### Authentication Features

- 🔐 **User Registration** - Secure account creation with validation- 🔐 **JWT Authentication** - Secure token-based authentication

- 👤 **User Login** - JWT-based authentication system- 👥 **Role-Based Access Control** - Admin and User roles

- 🛡️ **Admin Authentication** - Separate admin login with role verification- 🔒 **Password Security** - bcryptjs hashing with salt rounds

- 📊 **Profile Management** - User profile retrieval and updates- 🔑 **Token Management** - Automatic expiration and refresh

- 🔄 **Token Management** - JWT generation, validation, and refresh

### User Management Features

### User Management Features- 📝 **User Registration** - Complete registration with validation

- ✅ **User Approval Workflow** - Pending, approved, rejected status management- ✅ **Approval Workflow** - Admin approval/rejection system

- 📈 **User Listing** - Filtered user retrieval by status and role- 👤 **Profile Management** - User profile CRUD operations

- 🔍 **User Search** - Advanced filtering and search capabilities- 📊 **User Statistics** - Admin dashboard statistics

- 📝 **Audit Trail** - Complete logging of all user actions

- 🚫 **Account Deactivation** - User status management### Security Features

- 🛡️ **Input Validation** - express-validator for request validation

### Administrative Features- 🔒 **Security Headers** - Helmet.js for security headers

- 🛡️ **Admin Dashboard API** - Comprehensive user management endpoints- 🌐 **CORS Protection** - Configured cross-origin resource sharing

- 📊 **Statistics API** - User count and status statistics- ⚡ **Rate Limiting** - API rate limiting protection

- 🔒 **Role-Based Access** - Granular permission control- 📝 **Audit Logging** - Comprehensive request/error logging

- 📈 **Reporting** - User activity and approval metrics

### Database Features

## 🛠 Tech Stack- 🗄️ **Azure SQL Database** - Cloud-based production database

- 🔄 **Sequelize ORM** - Modern database abstraction layer

- **Runtime**: Node.js 18+- 🔄 **Migrations** - Database schema versioning

- **Framework**: Express.js 4.x- 📊 **Models & Relations** - Structured data relationships

- **Database**: Azure SQL Database with Sequelize ORM 6.x

- **Authentication**: JWT with bcryptjs for password hashing## 🛠 Tech Stack

- **Validation**: express-validator 7.x

- **Logging**: Winston 3.x with file rotation- **Runtime**: Node.js 18+ + Express.js

- **Testing**: Jest 29.x with Supertest- **Database**: Azure SQL Database with Sequelize ORM

- **Process Management**: PM2 ready- **Authentication**: JWT + bcryptjs

- **CORS**: Configurable cross-origin resource sharing- **Validation**: express-validator

- **Security**: Helmet, CORS, Rate Limiting

## 📁 Complete Project Structure- **Logging**: Winston + Morgan

- **Testing**: Jest

```- **Queue**: Bull (Redis-based) for background jobs

backend/- **Environment**: dotenv for configuration

├── src/

│   ├── app.js                 # Express application setup## 📁 Complete Project Structure

│   ├── server.js              # Server startup and configuration

│   ├── config/                # Configuration modules```

│   │   ├── database.js        # Database connection configurationbackend/

│   │   ├── dbManager.js       # Database management utilities├── src/

│   │   ├── jwt.js             # JWT configuration and utilities│   ├── config/                # Configuration files

│   │   ├── lokijs.js          # LokiJS in-memory database setup│   │   ├── database.js        # Sequelize database configuration

│   │   ├── nedb.js            # NeDB embedded database setup│   │   ├── jwt.js             # JWT configuration

│   │   ├── persistentDB.js    # Persistent database configuration│   │   ├── redis.js           # Redis configuration

│   │   └── redis.js           # Redis configuration for caching│   │   ├── persistentDB.js    # Persistent database manager

│   ├── controllers/           # Request handlers and business logic│   │   ├── dbManager.js       # Database manager utility

│   │   ├── AuthController.js  # Authentication endpoint logic│   │   ├── lokijs.js          # LokiJS configuration (development)

│   │   └── UserController.js  # User management endpoint logic│   │   └── nedb.js            # NeDB configuration (development)

│   ├── models/                # Database models and schemas│   ├── controllers/           # Route controllers

│   │   ├── index.js           # Model associations and exports│   │   ├── AuthController.js  # Authentication controller

│   │   └── User.js            # User model with validations│   │   └── UserController.js  # User management controller

│   ├── routes/                # API route definitions│   ├── models/               # Sequelize models

│   │   ├── auth.js            # Authentication routes│   │   ├── index.js          # Model exports and associations

│   │   ├── index.js           # Route aggregation and middleware│   │   └── User.js           # User model definition

│   │   └── users.js           # User management routes│   ├── routes/               # Express routes

│   ├── services/              # Business logic and external integrations│   │   ├── index.js          # Main route file

│   │   ├── AuthService.js     # Authentication business logic│   │   ├── auth.js           # Authentication routes

│   │   ├── QueueService.js    # Background job processing│   │   └── users.js          # User management routes

│   │   └── UserService.js     # User management business logic│   ├── services/             # Business logic layer

│   ├── utils/                 # Utility functions and helpers│   │   ├── AuthService.js    # Authentication business logic

│   │   ├── auth.js            # Authentication middleware and helpers│   │   ├── UserService.js    # User management business logic

│   │   ├── logger.js          # Winston logging configuration│   │   └── QueueService.js   # Background job processing

│   │   └── validation.js      # Custom validation rules│   ├── utils/                # Utility functions

│   └── workers/               # Background job workers│   │   ├── auth.js           # Authentication middleware

│       └── index.js           # Worker process management│   │   ├── validation.js     # Input validation rules

├── tests/                     # Test files and setup│   │   └── logger.js         # Winston logger configuration

│   ├── setup.js              # Test environment configuration│   ├── workers/              # Background workers

│   └── simple.test.js        # Basic test cases│   │   └── index.js          # Worker initialization

├── logs/                     # Application logs│   ├── app.js                # Express application setup

│   ├── combined.log          # All log levels│   └── server.js             # Server initialization

│   └── error.log             # Error logs only├── tests/                    # Test files

├── Dockerfile                # Container configuration│   ├── setup.js              # Test environment setup

├── package.json              # Dependencies and scripts│   └── simple.test.js        # Basic test cases

├── jest.config.json          # Jest testing configuration├── .env.example              # Environment template

└── README.md                 # Project documentation├── .gitignore                # Git ignore rules

```├── Dockerfile                # Docker container configuration

├── jest.config.json          # Jest testing configuration

## 🗄️ Database Architecture├── package.json              # Dependencies and scripts

└── README.md                 # Documentation

### User Model (`src/models/User.js`)```

```javascript
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100],
      isAlpha: true
    }
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100],
      isAlpha: true
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      len: [5, 255]
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: [8, 255]
    }
  },
  role: {
    type: DataTypes.ENUM('USER', 'ADMIN'),
    allowNull: false,
    defaultValue: 'USER'
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
    allowNull: false,
    defaultValue: 'PENDING'
  },
  rejectionReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'users',
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 12);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    }
  }
});
```

## 🔌 API Endpoints

### Authentication Routes (`src/routes/auth.js`)
```javascript
// POST /api/auth/register - User registration
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}

// POST /api/auth/login - User login
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}

// POST /api/auth/admin/login - Admin login
{
  "email": "admin@example.com",
  "password": "AdminPassword123"
}

// GET /api/auth/profile - Get user profile (Protected)
// Authorization: Bearer <jwt_token>

// PUT /api/auth/profile - Update user profile (Protected)
{
  "firstName": "John",
  "lastName": "Smith"
}
```

### User Management Routes (`src/routes/users.js`)
```javascript
// GET /api/users/pending - Get pending users (Admin only)
// GET /api/users/approved - Get approved users (Admin only)
// GET /api/users/rejected - Get rejected users (Admin only)

// POST /api/users/:id/approve-reject - Approve/reject user (Admin only)
{
  "action": "APPROVED", // or "REJECTED"
  "rejectionReason": "Reason for rejection" // optional, required for rejection
}

// GET /api/users/stats - Get user statistics (Admin only)
// DELETE /api/users/:id - Delete user (Admin only)
```

## 🎯 Controller Implementation

### AuthController (`src/controllers/AuthController.js`)
```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const AuthService = require('../services/AuthService');
const logger = require('../utils/logger');

class AuthController {
  static async register(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Create new user
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role: 'USER',
        status: 'PENDING'
      });

      logger.info(`New user registered: ${email}`);

      res.status(201).json({
        success: true,
        message: 'User registered successfully. Awaiting admin approval.',
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          status: user.status
        }
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      if (user.status !== 'APPROVED') {
        return res.status(403).json({
          success: false,
          message: `Account is ${user.status.toLowerCase()}. Contact admin for assistance.`
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Update last login
      await user.update({ lastLoginAt: new Date() });

      const token = AuthService.generateToken(user);
      
      logger.info(`User logged in: ${email}`);

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            status: user.status
          }
        }
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async adminLogin(req, res) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ 
        where: { 
          email,
          role: 'ADMIN',
          isActive: true
        }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid admin credentials'
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid admin credentials'
        });
      }

      await user.update({ lastLoginAt: new Date() });

      const token = AuthService.generateToken(user);
      
      logger.info(`Admin logged in: ${email}`);

      res.json({
        success: true,
        message: 'Admin login successful',
        data: {
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
          }
        }
      });
    } catch (error) {
      logger.error('Admin login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AuthController;
```

### UserController (`src/controllers/UserController.js`)
```javascript
const { User } = require('../models');
const UserService = require('../services/UserService');
const logger = require('../utils/logger');
const { Op } = require('sequelize');

class UserController {
  static async getPendingUsers(req, res) {
    try {
      const users = await User.findAll({
        where: { status: 'PENDING' },
        attributes: { exclude: ['password'] },
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      logger.error('Get pending users error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getApprovedUsers(req, res) {
    try {
      const users = await User.findAll({
        where: { 
          status: 'APPROVED',
          role: 'USER'
        },
        attributes: { exclude: ['password'] },
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      logger.error('Get approved users error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async approveRejectUser(req, res) {
    try {
      const { id } = req.params;
      const { action, rejectionReason } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (user.status !== 'PENDING') {
        return res.status(400).json({
          success: false,
          message: 'User is not in pending status'
        });
      }

      const updateData = { status: action };
      if (action === 'REJECTED' && rejectionReason) {
        updateData.rejectionReason = rejectionReason;
      }

      await user.update(updateData);

      logger.info(`User ${action.toLowerCase()}: ${user.email} by admin ${req.user.email}`);

      res.json({
        success: true,
        message: `User ${action.toLowerCase()} successfully`,
        data: {
          id: user.id,
          email: user.email,
          status: user.status,
          rejectionReason: user.rejectionReason
        }
      });
    } catch (error) {
      logger.error('Approve/reject user error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getUserStats(req, res) {
    try {
      const stats = await UserService.getUserStatistics();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      logger.error('Get user stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = UserController;
```

## 🛡️ Authentication & Security

### JWT Configuration (`src/config/jwt.js`)
```javascript
const jwt = require('jsonwebtoken');

const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  issuer: process.env.JWT_ISSUER || 'user-onboarding-platform',
  algorithm: 'HS256'
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status
  };

  return jwt.sign(payload, JWT_CONFIG.secret, {
    expiresIn: JWT_CONFIG.expiresIn,
    issuer: JWT_CONFIG.issuer,
    algorithm: JWT_CONFIG.algorithm
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_CONFIG.secret, {
      issuer: JWT_CONFIG.issuer,
      algorithms: [JWT_CONFIG.algorithm]
    });
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = {
  JWT_CONFIG,
  generateToken,
  verifyToken
};
```

### Authentication Middleware (`src/utils/auth.js`)
```javascript
const { verifyToken } = require('../config/jwt');
const { User } = require('../models');
const logger = require('./logger');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = verifyToken(token);
    
    // Verify user still exists and is active
    const user = await User.findByPk(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
};

const requireApprovedUser = (req, res, next) => {
  if (req.user.status !== 'APPROVED') {
    return res.status(403).json({
      success: false,
      message: 'Account must be approved to access this resource'
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireApprovedUser
};
```

## 📝 Validation & Error Handling

### Input Validation (`src/utils/validation.js`)
```javascript
const { body, validationResult } = require('express-validator');

const registrationValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('First name must be 2-100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Last name must be 2-100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  registrationValidation,
  loginValidation,
  handleValidationErrors
};
```

## 📊 Logging System

### Logger Configuration (`src/utils/logger.js`)
```javascript
const winston = require('winston');
const path = require('path');

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'user-onboarding-api' },
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;
```

## 🗃️ Database Configuration

### Main Database Config (`src/config/database.js`)
```javascript
const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'user_onboarding',
  process.env.DB_USER || 'username',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 1433,
    dialect: 'mssql',
    dialectOptions: {
      encrypt: true,
      trustServerCertificate: process.env.NODE_ENV === 'development'
    },
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /TIMEOUT/
      ],
      max: 3
    }
  }
);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully');
    
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    logger.info('Database synchronization completed');
  } catch (error) {
    logger.error('Unable to connect to database:', error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDatabase
};
```

## 🎯 Business Services

### AuthService (`src/services/AuthService.js`)
```javascript
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwt');
const { User } = require('../models');
const logger = require('../utils/logger');

class AuthService {
  static generateToken(user) {
    return generateToken(user);
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, 12);
  }

  static async comparePasswords(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async createUser(userData) {
    try {
      const user = await User.create({
        ...userData,
        role: 'USER',
        status: 'PENDING'
      });
      
      logger.info(`New user created: ${user.email}`);
      return user;
    } catch (error) {
      logger.error('User creation error:', error);
      throw error;
    }
  }

  static async findUserByEmail(email) {
    return User.findOne({ where: { email } });
  }

  static async updateLastLogin(userId) {
    try {
      await User.update(
        { lastLoginAt: new Date() },
        { where: { id: userId } }
      );
    } catch (error) {
      logger.error('Update last login error:', error);
    }
  }
}

module.exports = AuthService;
```

### UserService (`src/services/UserService.js`)
```javascript
const { User } = require('../models');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

class UserService {
  static async getUserStatistics() {
    try {
      const stats = await User.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['status'],
        raw: true
      });

      const formattedStats = {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
      };

      stats.forEach(stat => {
        formattedStats[stat.status.toLowerCase()] = parseInt(stat.count);
        formattedStats.total += parseInt(stat.count);
      });

      return formattedStats;
    } catch (error) {
      logger.error('Get user statistics error:', error);
      throw error;
    }
  }

  static async updateUserStatus(userId, status, rejectionReason = null) {
    try {
      const updateData = { status };
      if (status === 'REJECTED' && rejectionReason) {
        updateData.rejectionReason = rejectionReason;
      }

      await User.update(updateData, { where: { id: userId } });
      
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });
      
      logger.info(`User status updated: ${user.email} -> ${status}`);
      return user;
    } catch (error) {
      logger.error('Update user status error:', error);
      throw error;
    }
  }

  static async searchUsers(filters = {}) {
    try {
      const whereClause = {};
      
      if (filters.status) {
        whereClause.status = filters.status;
      }
      
      if (filters.role) {
        whereClause.role = filters.role;
      }
      
      if (filters.search) {
        whereClause[Op.or] = [
          { firstName: { [Op.like]: `%${filters.search}%` } },
          { lastName: { [Op.like]: `%${filters.search}%` } },
          { email: { [Op.like]: `%${filters.search}%` } }
        ];
      }

      const users = await User.findAll({
        where: whereClause,
        attributes: { exclude: ['password'] },
        order: [['createdAt', 'DESC']],
        limit: filters.limit || 50,
        offset: filters.offset || 0
      });

      return users;
    } catch (error) {
      logger.error('Search users error:', error);
      throw error;
    }
  }
}

module.exports = UserService;
```

## 🧪 Testing Configuration

### Jest Configuration (`jest.config.json`)
```json
{
  "testEnvironment": "node",
  "setupFilesAfterEnv": ["<rootDir>/tests/setup.js"],
  "testMatch": ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "coverageReporters": ["text", "lcov", "html"],
  "collectCoverageFrom": [
    "src/**/*.js",
    "!src/server.js",
    "!src/config/**/*.js",
    "!src/workers/**/*.js"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

### Test Setup (`tests/setup.js`)
```javascript
const { sequelize } = require('../src/config/database');

beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-jwt-secret';
  
  // Connect to test database
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Clean up database connections
  await sequelize.close();
});

beforeEach(async () => {
  // Clear all tables before each test
  await sequelize.truncate({ cascade: true, restartIdentity: true });
});
```

## 🚀 Development Setup

### Prerequisites
- Node.js 18+
- Azure SQL Database or SQL Server
- npm 8+

### Installation Steps
```bash
# 1. Clone repository
git clone <repository-url>
cd backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# 4. Run database migrations
npm run db:sync

# 5. Start development server
npm run dev
```

### Environment Variables (`.env`)
```bash
# Database Configuration
DB_HOST=your-azure-sql-server.database.windows.net
DB_NAME=user_onboarding
DB_USER=your-username
DB_PASSWORD=your-password
DB_PORT=1433

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
JWT_ISSUER=user-onboarding-platform

# Server Configuration
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Available Scripts
```bash
npm start            # Start production server
npm run dev          # Start development server with nodemon
npm test             # Run test suite
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run db:sync      # Sync database models
npm run logs:tail    # Tail application logs
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "sequelize": "^6.35.1",
    "mssql": "^10.0.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.1",
    "winston": "^3.11.0",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "express-rate-limit": "^7.1.5"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "nodemon": "^3.0.2",
    "@types/jest": "^29.5.8"
  }
}
```

## 🐳 Docker Configuration

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
CMD ["npm", "start"]
```

## 🎯 Developer Requirements & Prompt Expectations

### Expected Input for Similar Project Creation

```markdown
## Project Requirements
- RESTful API with authentication and authorization
- User registration and approval workflow
- Admin dashboard for user management
- JWT-based authentication system
- Role-based access control (USER, ADMIN)
- User status management (PENDING, APPROVED, REJECTED)
- Comprehensive input validation and error handling
- Structured logging and monitoring
- Database integration with ORM
- Test coverage and CI/CD ready

## Technical Specifications
- Node.js 18+ with Express.js framework
- Sequelize ORM with Azure SQL Database/SQL Server
- JWT authentication with bcryptjs password hashing
- express-validator for input validation
- Winston for structured logging
- Jest and Supertest for comprehensive testing
- Docker containerization support
- PM2 process management ready

## API Endpoints to Implement
1. Authentication endpoints (register, login, admin login, profile)
2. User management endpoints (CRUD operations)
3. Admin-specific endpoints (user approval, statistics)
4. Protected routes with JWT middleware
5. Role-based access control middleware
6. Input validation for all endpoints
7. Error handling with proper HTTP status codes
8. Comprehensive API documentation

## Database Schema Requirements
- User model with comprehensive validation
- Role-based permissions (USER, ADMIN)
- User status workflow (PENDING, APPROVED, REJECTED)
- Audit fields (timestamps, last login)
- Database relationships and constraints
- Migration scripts for deployment

## Security Requirements
- Password hashing with bcrypt (salt rounds: 12)
- JWT token generation and validation
- Input sanitization and validation
- CORS configuration for frontend integration
- Rate limiting for API endpoints
- Helmet.js for security headers
- SQL injection prevention with ORM
```

### Development Steps for Similar Project
1. **Project Initialization**
   ```bash
   mkdir backend && cd backend
   npm init -y
   npm install express sequelize mssql bcryptjs jsonwebtoken
   npm install -D jest supertest nodemon
   ```

2. **Database Setup**
   - Configure Sequelize with Azure SQL Database
   - Create User model with validations
   - Set up database synchronization
   - Create migration scripts

3. **Authentication System**
   - Implement JWT configuration
   - Create authentication middleware
   - Build login/register endpoints
   - Add role-based access control

4. **API Development**
   - Create layered architecture (routes, controllers, services)
   - Implement user management endpoints
   - Add admin-specific functionality
   - Set up comprehensive validation

5. **Testing & Logging**
   - Configure Jest testing environment
   - Write unit and integration tests
   - Set up Winston logging
   - Add health check endpoints

6. **Production Readiness**
   - Create Docker configuration
   - Set up environment variables
   - Configure process management
   - Add monitoring and logging

## 🔐 Security Best Practices

- **Password Security** - Bcrypt with 12 salt rounds
- **JWT Security** - Secure secret key, proper expiration
- **Input Validation** - Comprehensive server-side validation
- **SQL Injection Prevention** - Sequelize ORM parameterized queries
- **Rate Limiting** - API endpoint protection
- **CORS Configuration** - Proper origin validation
- **Security Headers** - Helmet.js implementation

## 📊 Performance Optimization

- **Database Connection Pooling** - Optimized Sequelize configuration
- **Response Compression** - Gzip compression middleware
- **Efficient Queries** - Proper indexing and query optimization
- **Caching Strategy** - Redis integration ready
- **Background Jobs** - Queue service implementation

## 🤝 Contributing Guidelines

### Code Standards
- Use ES6+ features and async/await
- Follow RESTful API design principles
- Write comprehensive tests for all features
- Use proper error handling and logging

### Git Workflow
1. Fork repository
2. Create feature branch
3. Implement changes with tests
4. Submit pull request
5. Code review and merge

This comprehensive guide provides everything needed to recreate or extend the backend API with all essential features, security measures, and best practices included.