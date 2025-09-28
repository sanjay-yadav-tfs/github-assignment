#!/usr/bin/env node

/**
 * Azure SQL Database Migration Script
 * This script helps migrate from SQLite to Azure SQL Database
 */

require('dotenv').config();
const { Sequelize } = require('sequelize');
const User = require('../src/models/User');

async function migrateToAzureSQL() {
  console.log('🚀 Starting Azure SQL Database migration...');

  // Create Azure SQL connection
  const azureSequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 1433,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true,
        requestTimeout: 30000,
        connectionTimeout: 15000,
      },
    },
    logging: console.log,
  });

  try {
    // Test connection
    console.log('🔍 Testing Azure SQL connection...');
    await azureSequelize.authenticate();
    console.log('✅ Azure SQL connection successful');

    // Sync database schema
    console.log('🔧 Creating database schema...');
    
    // Initialize models with Azure SQL connection
    User.init(User.getAttributes(), {
      sequelize: azureSequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    });

    // Create tables
    await azureSequelize.sync({ force: false, alter: true });
    console.log('✅ Database schema created successfully');

    // Create default admin user
    console.log('👤 Creating default admin user...');
    const bcrypt = require('bcryptjs');
    
    const existingAdmin = await User.findOne({
      where: { email: 'admin@example.com', role: 'ADMIN' }
    });

    if (!existingAdmin) {
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
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    console.log('🎉 Azure SQL migration completed successfully!');
    
    // Connection info
    console.log('\n📋 Azure SQL Database Details:');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log(`Username: ${process.env.DB_USERNAME}`);
    console.log('\n🔑 Admin Credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    
    if (error.name === 'ConnectionError') {
      console.log('\n🔧 Troubleshooting Tips:');
      console.log('1. Check if your IP is whitelisted in Azure SQL firewall');
      console.log('2. Verify connection string details');
      console.log('3. Ensure Azure SQL server is running');
      console.log('4. Check if the database exists');
    }
    
    process.exit(1);
  } finally {
    await azureSequelize.close();
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateToAzureSQL().catch(console.error);
}

module.exports = migrateToAzureSQL;