/**
 * Unified Database Manager
 * Supports multiple embedded database options
 */

require('dotenv').config();

class DatabaseManager {
  constructor() {
    this.dbType = process.env.DB_TYPE || 'sqlite'; // sqlite, nedb, lokijs
    this.db = null;
  }

  async initialize() {
    switch (this.dbType) {
      case 'sqlite':
        return this.initializeSQLite();
      case 'nedb':
        return this.initializeNeDB();
      case 'lokijs':
        return this.initializeLokiJS();
      default:
        throw new Error(`Unsupported database type: ${this.dbType}`);
    }
  }

  async initializeSQLite() {
    const { sequelize } = require('./database');
    await sequelize.authenticate();
    await sequelize.sync();
    this.db = sequelize;
    console.log(`✅ SQLite database initialized`);
    return this.db;
  }

  async initializeNeDB() {
    const NeDBManager = require('./nedb');
    this.db = new NeDBManager();
    console.log(`✅ NeDB database initialized`);
    return this.db;
  }

  async initializeLokiJS() {
    const LokiDBManager = require('./lokijs');
    this.db = new LokiDBManager();
    await this.db.initialize();
    console.log(`✅ LokiJS database initialized`);
    return this.db;
  }

  getDatabase() {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.db;
  }

  getDatabaseType() {
    return this.dbType;
  }
}

// Singleton instance
let dbManager = null;

const getDBManager = () => {
  if (!dbManager) {
    dbManager = new DatabaseManager();
  }
  return dbManager;
};

module.exports = {
  DatabaseManager,
  getDBManager
};