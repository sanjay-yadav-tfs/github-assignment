const { sequelize } = require('../src/config/database');
const bcrypt = require('bcryptjs');

// Test database setup
const setupTestDB = async () => {
  // Force sync database (drops tables if they exist)
  await sequelize.sync({ force: true });
  
  // Create test admin user
  const User = require('../src/models/User');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await User.create({
    firstName: 'Test',
    lastName: 'Admin',
    email: 'test.admin@example.com',
    password: hashedPassword,
    role: 'ADMIN',
    status: 'APPROVED'
  });
  
  // Create test regular user
  await User.create({
    firstName: 'Test',
    lastName: 'User',
    email: 'test.user@example.com',
    password: await bcrypt.hash('testpass123', 10),
    role: 'USER',
    status: 'PENDING'
  });
};

const teardownTestDB = async () => {
  await sequelize.close();
};

module.exports = {
  setupTestDB,
  teardownTestDB
};