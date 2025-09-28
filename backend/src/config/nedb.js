const Datastore = require('nedb');
const path = require('path');
const bcrypt = require('bcryptjs');

/**
 * NeDB Embedded Database Configuration
 * Pure JavaScript database that stores data in files
 */

class NeDBManager {
  constructor() {
    this.dbPath = path.join(__dirname, '../../database/nedb');
    this.users = new Datastore({ 
      filename: path.join(this.dbPath, 'users.db'), 
      autoload: true,
      timestampData: true
    });
    
    // Create indexes for better performance
    this.users.ensureIndex({ fieldName: 'email', unique: true });
    this.users.ensureIndex({ fieldName: 'role' });
    this.users.ensureIndex({ fieldName: 'status' });
    
    this.initializeAdmin();
  }

  async initializeAdmin() {
    return new Promise((resolve, reject) => {
      this.users.findOne({ email: 'admin@example.com', role: 'ADMIN' }, async (err, admin) => {
        if (err) return reject(err);
        
        if (!admin) {
          const hashedPassword = await bcrypt.hash('admin123', 10);
          
          const adminUser = {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'ADMIN',
            status: 'APPROVED',
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          this.users.insert(adminUser, (err, newDoc) => {
            if (err) return reject(err);
            console.log('✅ NeDB: Default admin user created');
            resolve(newDoc);
          });
        } else {
          console.log('ℹ️ NeDB: Admin user already exists');
          resolve(admin);
        }
      });
    });
  }

  // User operations
  async createUser(userData) {
    return new Promise((resolve, reject) => {
      const user = {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      this.users.insert(user, (err, newDoc) => {
        if (err) return reject(err);
        resolve(newDoc);
      });
    });
  }

  async findUser(query) {
    return new Promise((resolve, reject) => {
      this.users.findOne(query, (err, doc) => {
        if (err) return reject(err);
        resolve(doc);
      });
    });
  }

  async findUsers(query = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let cursor = this.users.find(query);
      
      if (options.sort) {
        cursor = cursor.sort(options.sort);
      }
      
      if (options.limit) {
        cursor = cursor.limit(options.limit);
      }
      
      if (options.skip) {
        cursor = cursor.skip(options.skip);
      }
      
      cursor.exec((err, docs) => {
        if (err) return reject(err);
        resolve(docs);
      });
    });
  }

  async updateUser(query, update) {
    return new Promise((resolve, reject) => {
      const updateData = {
        ...update,
        updatedAt: new Date()
      };
      
      this.users.update(query, { $set: updateData }, { returnUpdatedDocs: true }, (err, numReplaced, affectedDocuments) => {
        if (err) return reject(err);
        resolve(affectedDocuments);
      });
    });
  }

  async deleteUser(query) {
    return new Promise((resolve, reject) => {
      this.users.remove(query, {}, (err, numRemoved) => {
        if (err) return reject(err);
        resolve(numRemoved);
      });
    });
  }

  async countUsers(query = {}) {
    return new Promise((resolve, reject) => {
      this.users.count(query, (err, count) => {
        if (err) return reject(err);
        resolve(count);
      });
    });
  }
}

module.exports = NeDBManager;