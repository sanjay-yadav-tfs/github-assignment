const App = require('./app');
const { sequelize } = require('./config/database');
const AuthService = require('./services/AuthService');
const Worker = require('./workers');
const logger = require('./utils/logger');
require('dotenv').config();

class Server {
  constructor() {
    this.app = new App();
    this.server = null;
    this.worker = new Worker();
  }

  async start() {
    try {
      const PORT = process.env.PORT || 3000;
      logger.info('🔄 Starting server initialization...');

      // Initialize the application
      logger.info('🔄 Initializing application...');
      await this.app.initialize();
      logger.info('✅ Application initialized');

      // Sync database
      logger.info('🔄 Synchronizing database...');
      await this.syncDatabase();
      logger.info('✅ Database synchronized');

      // Create default admin user
      logger.info('🔄 Creating default admin user...');
      await this.createDefaultAdmin();
      logger.info('✅ Admin user ready');

      // Start background worker
      logger.info('🔄 Starting background worker...');
      await this.worker.start();
      logger.info('✅ Background worker started');

      // Start the server
      logger.info('🔄 Starting HTTP server...');
      this.server = this.app.getExpressApp().listen(PORT, () => {
        logger.info(`🚀 Server running on port ${PORT}`);
        logger.info(`📖 API Documentation: http://localhost:${PORT}/api`);
        logger.info(`🏥 Health Check: http://localhost:${PORT}/api/health`);
        
        if (process.env.NODE_ENV === 'development') {
          logger.info(`🔧 Environment: ${process.env.NODE_ENV}`);
          logger.info(`🗄️  Database: ${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT}`);
          logger.info(`🔴 Redis: ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
        }
      });

      // Setup graceful shutdown
      logger.info('🔄 Setting up graceful shutdown...');
      this.setupGracefulShutdown();
      logger.info('✅ Server startup completed successfully');

    } catch (error) {
      logger.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  async syncDatabase() {
    try {
      // In production, you might want to use migrations instead
      await sequelize.sync({ 
        force: process.env.NODE_ENV === 'development' && process.env.DB_FORCE_SYNC === 'true',
        alter: process.env.NODE_ENV === 'development' && process.env.DB_ALTER_SYNC === 'true',
      });
      
      logger.info('✅ Database synchronized successfully');
    } catch (error) {
      logger.error('❌ Database synchronization failed:', error);
      throw error;
    }
  }

  async createDefaultAdmin() {
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

      // Check if admin already exists
      const existingAdmin = await AuthService.findAdminUser(adminEmail);
      
      if (!existingAdmin) {
        await AuthService.createAdminUser({
          firstName: 'System',
          lastName: 'Administrator',
          email: adminEmail,
          password: adminPassword,
        });
        
        logger.info(`✅ Default admin user created: ${adminEmail}`);
        
        if (process.env.NODE_ENV === 'development') {
          logger.info(`🔑 Admin credentials: ${adminEmail} / ${adminPassword}`);
        }
      } else {
        logger.info('✅ Admin user already exists');
      }
    } catch (error) {
      // Don't fail server startup if admin creation fails
      logger.error('⚠️  Failed to create default admin user:', error.message);
    }
  }

  setupGracefulShutdown() {
    const gracefulShutdown = async (signal) => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);

      try {
        // Stop accepting new connections
        if (this.server) {
          this.server.close(() => {
            logger.info('HTTP server closed');
          });
        }

        // Stop background worker
        await this.worker.stop();

        // Close database connection
        await sequelize.close();
        logger.info('Database connection closed');

        logger.info('✅ Graceful shutdown completed');
        process.exit(0);
      } catch (error) {
        logger.error('❌ Error during graceful shutdown:', error);
        process.exit(1);
      }
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  }
}

// Add method to AuthService to find admin user
const { User } = require('./models');
AuthService.findAdminUser = async function(email) {
  return await User.findOne({
    where: {
      email,
      role: 'ADMIN',
    },
  });
};

// Start the server if this file is run directly
if (require.main === module) {
  const server = new Server();
  server.start();
}

module.exports = Server;