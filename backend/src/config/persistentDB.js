const { sequelize } = require('./database');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

/**
 * Persistent Database Initializer
 * Safely initializes database without losing existing data
 */

class PersistentDBManager {
  constructor() {
    this.dbPath = this.getDbPath();
    this.isNewDatabase = !fs.existsSync(this.dbPath);
  }

  getDbPath() {
    const dbName = process.env.DB_NAME || 'database/persistent_user_onboarding.db';
    return path.resolve(dbName);
  }

  async initialize() {
    try {
      console.log('🔍 Checking database status...');
      console.log(`📍 Database location: ${this.dbPath}`);
      console.log(`📊 Database exists: ${!this.isNewDatabase}`);

      // Test connection
      await sequelize.authenticate();
      console.log('✅ Database connection established');

      // Initialize models without dropping existing tables
      await this.initializeModels();

      // Create admin user only if database is new or admin doesn't exist
      await this.ensureAdminUser();

      // Create backup if enabled
      await this.createBackupIfEnabled();

      console.log('🎉 Persistent database initialized successfully');
      return sequelize;

    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }

  async initializeModels() {
    try {
      // Models are already initialized by the main app
      // Just verify the sync without forcing
      const { sequelize } = require('./database');
      
      // Only sync if not already synced
      if (!sequelize.isDefined('User')) {
        await sequelize.sync({ 
          force: false,  // Never drop existing tables
          alter: false   // Don't alter existing table structure
        });
      }
      
      console.log('✅ Database models verified (data preserved)');
    } catch (error) {
      console.warn('⚠️ Model verification warning:', error.message);
      // Don't throw - models might already be initialized
    }
  }

  async ensureAdminUser() {
    try {
      // Check if admin user exists
      const existingAdmin = await User.findOne({
        where: { 
          email: 'admin@example.com',
          role: 'ADMIN'
        }
      });

      if (!existingAdmin) {
        console.log('👤 Creating default admin user...');
        
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        await User.create({
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@example.com',
          password: hashedPassword,
          role: 'ADMIN',
          status: 'APPROVED',
        });
        
        console.log('✅ Default admin user created: admin@example.com');
        console.log('🔑 Admin credentials: admin@example.com / admin123');
      } else {
        console.log('ℹ️ Admin user already exists (data preserved)');
      }
    } catch (error) {
      console.error('❌ Admin user creation failed:', error);
      // Don't throw - this is not critical for existing databases
    }
  }

  async createBackupIfEnabled() {
    if (process.env.DB_BACKUP_ENABLED === 'true' && !this.isNewDatabase) {
      try {
        const backupDir = path.join(path.dirname(this.dbPath), 'backups');
        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(backupDir, `backup-${timestamp}.db`);
        
        fs.copyFileSync(this.dbPath, backupPath);
        console.log(`💾 Database backup created: ${backupPath}`);
        
        // Clean old backups (keep only last 5)
        this.cleanOldBackups(backupDir);
        
      } catch (error) {
        console.warn('⚠️ Backup creation failed:', error.message);
      }
    }
  }

  cleanOldBackups(backupDir) {
    try {
      const backups = fs.readdirSync(backupDir)
        .filter(file => file.startsWith('backup-') && file.endsWith('.db'))
        .map(file => ({
          name: file,
          path: path.join(backupDir, file),
          time: fs.statSync(path.join(backupDir, file)).mtime
        }))
        .sort((a, b) => b.time - a.time);

      // Keep only the 5 most recent backups
      if (backups.length > 5) {
        backups.slice(5).forEach(backup => {
          fs.unlinkSync(backup.path);
          console.log(`🗑️ Cleaned old backup: ${backup.name}`);
        });
      }
    } catch (error) {
      console.warn('⚠️ Backup cleanup failed:', error.message);
    }
  }

  async getStats() {
    try {
      const userCount = await User.count();
      const adminCount = await User.count({ where: { role: 'ADMIN' } });
      const pendingCount = await User.count({ where: { status: 'PENDING' } });
      const approvedCount = await User.count({ where: { status: 'APPROVED' } });

      return {
        totalUsers: userCount,
        admins: adminCount,
        pending: pendingCount,
        approved: approvedCount,
        databasePath: this.dbPath,
        databaseExists: !this.isNewDatabase,
        databaseSize: this.getDatabaseSize()
      };
    } catch (error) {
      console.error('❌ Failed to get database stats:', error);
      return null;
    }
  }

  getDatabaseSize() {
    try {
      if (fs.existsSync(this.dbPath)) {
        const stats = fs.statSync(this.dbPath);
        return `${(stats.size / 1024).toFixed(2)} KB`;
      }
      return '0 KB';
    } catch (error) {
      return 'Unknown';
    }
  }

  async close() {
    try {
      await sequelize.close();
      console.log('🔒 Database connection closed');
    } catch (error) {
      console.error('❌ Error closing database:', error);
    }
  }
}

module.exports = PersistentDBManager;