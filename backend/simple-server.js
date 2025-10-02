// Minimal server for testing Azure SQL connection
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { sequelize } = require('./src/config/database');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: 'Azure SQL',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 3000;

// Function to create admin user
async function createAdminUser() {
  try {
    const bcrypt = require('bcrypt');
    const User = require('./src/models/User');
    
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: { email: adminEmail, role: 'ADMIN' }
    });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    await User.create({
      firstName: 'System',
      lastName: 'Administrator',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      status: 'approved'
    });
    
    console.log('✅ Admin user created successfully');
    console.log('🔑 Admin credentials: admin@example.com / admin123');
    
  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
  }
}

async function startServer() {
  try {
    console.log('🔄 Testing Azure SQL connection...');
    await sequelize.authenticate();
    console.log('✅ Azure SQL connection successful');
    
    console.log('🔄 Syncing database...');
    await sequelize.sync();
    console.log('✅ Database synced');
    
    // Create admin user if it doesn't exist
    await createAdminUser();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
      console.log(`🔐 Register: http://localhost:${PORT}/api/auth/register`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
}

startServer();