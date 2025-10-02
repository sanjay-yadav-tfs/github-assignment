// Fix admin user role
require('dotenv').config();
const { sequelize } = require('./src/config/database');
const User = require('./src/models/User');

async function fixAdminRole() {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    
    console.log('🔧 Updating admin user role...');
    const result = await User.update(
      { role: 'ADMIN' },
      { 
        where: { 
          email: 'admin@example.com',
          role: 'admin' 
        } 
      }
    );
    
    if (result[0] > 0) {
      console.log('✅ Admin user role updated to ADMIN');
    } else {
      console.log('⚠️ No admin user found to update');
    }
    
    // Verify the update
    const admin = await User.findOne({
      where: { email: 'admin@example.com' }
    });
    
    if (admin) {
      console.log(`🔍 Admin user role is now: ${admin.role}`);
    }
    
    await sequelize.close();
    console.log('✅ Done');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixAdminRole();