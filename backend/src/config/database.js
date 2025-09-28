const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const dialect = process.env.DB_DIALECT || 'mssql';

// Ensure database directory exists
const ensureDatabaseDirectory = () => {
  const dbDir = path.join(__dirname, '../../database');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('📁 Created database directory');
  }
};

let sequelizeConfig = {
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};

if (dialect === 'sqlite') {
  // Ensure database directory exists
  ensureDatabaseDirectory();
  
  // SQLite configuration - Simple and persistent
  const dbPath = process.env.DB_NAME || 'database/persistent_user_onboarding.db';
  const fullDbPath = path.resolve(dbPath);
  
  console.log(`📁 Database file: ${fullDbPath}`);
  
  sequelizeConfig = {
    ...sequelizeConfig,
    dialect: 'sqlite',
    storage: fullDbPath,
    logging: false, // Disable SQL logging for cleaner output
  };
} else {
  // MSSQL configuration for production/Azure SQL
  sequelizeConfig = {
    ...sequelizeConfig,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 1433,
    database: process.env.DB_NAME || 'user_onboarding_db',
    username: process.env.DB_USERNAME || 'sa',
    password: process.env.DB_PASSWORD,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true' || true, // Always true for Azure SQL
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' || false,
        enableArithAbort: true,
        requestTimeout: parseInt(process.env.DB_REQUEST_TIMEOUT) || 30000,
        connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 15000,
      },
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      match: [
        /ECONNTIMEOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ESOCKETTIMEDOUT/,
        /EHOSTDOWN/,
        /EPIPE/,
      ],
      max: 3,
    },
  };
}

const sequelize = new Sequelize(sequelizeConfig);

// Test the connection
const testConnection = async () => {
  try {
    console.log('🔄 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    throw error; // Throw error to stop initialization if database connection fails
  }
};

module.exports = {
  sequelize,
  testConnection,
};