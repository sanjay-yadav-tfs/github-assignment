const loki = require('lokijs');
const path = require('path');
const bcrypt = require('bcryptjs');

/**
 * LokiJS In-Memory Database with File Persistence
 * Fast in-memory operations with automatic file saving
 */

class LokiDBManager {
  constructor() {
    this.dbPath = path.join(__dirname, '../../database/loki.db');
    this.db = null;
    this.users = null;
    this.initialized = false;
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      this.db = new loki(this.dbPath, {
        autoload: true,
        autoloadCallback: async () => {
          try {
            await this.setupCollections();
            await this.initializeAdmin();
            this.initialized = true;
            console.log('✅ LokiJS database initialized');
            resolve();
          } catch (error) {
            reject(error);
          }
        },
        autosave: true,
        autosaveInterval: 4000, // Save every 4 seconds
        adapter: new loki.LokiFSAdapter()
      });
    });
  }

  async setupCollections() {
    // Get or create users collection
    this.users = this.db.getCollection('users');
    if (!this.users) {
      this.users = this.db.addCollection('users', {
        unique: ['email'],
        indices: ['role', 'status', 'email']
      });
    }
  }

  async initializeAdmin() {
    const existingAdmin = this.users.findOne({ 
      email: 'admin@example.com', 
      role: 'ADMIN' 
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      this.users.insert({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN',
        status: 'APPROVED',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log('✅ LokiJS: Default admin user created');
    } else {
      console.log('ℹ️ LokiJS: Admin user already exists');
    }
  }

  // Ensure database is initialized
  async ensureInitialized() {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  // User operations
  async createUser(userData) {
    await this.ensureInitialized();
    
    const user = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return this.users.insert(user);
  }

  async findUser(query) {
    await this.ensureInitialized();
    return this.users.findOne(query);
  }

  async findUsers(query = {}) {
    await this.ensureInitialized();
    return this.users.find(query);
  }

  async updateUser(query, update) {
    await this.ensureInitialized();
    
    const user = this.users.findOne(query);
    if (!user) return null;
    
    Object.assign(user, update, { updatedAt: new Date() });
    this.users.update(user);
    return user;
  }

  async deleteUser(query) {
    await this.ensureInitialized();
    const user = this.users.findOne(query);
    if (user) {
      this.users.remove(user);
      return true;
    }
    return false;
  }

  async countUsers(query = {}) {
    await this.ensureInitialized();
    return this.users.count(query);
  }

  // Advanced queries
  async getUsersByStatus(status) {
    await this.ensureInitialized();
    return this.users.find({ status });
  }

  async searchUsers(searchTerm) {
    await this.ensureInitialized();
    return this.users.where((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      const term = searchTerm.toLowerCase();
      
      return fullName.includes(term) || email.includes(term);
    });
  }

  // Save database manually
  async saveDatabase() {
    return new Promise((resolve, reject) => {
      this.db.saveDatabase((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

module.exports = LokiDBManager;