const { sequelize } = require('../config/database');
const User = require('./User');

// Define associations here if needed
// User.hasMany(OtherModel);
// OtherModel.belongsTo(User);

// Self-referencing association for approvedBy
User.belongsTo(User, {
  as: 'approver',
  foreignKey: 'approvedBy',
  constraints: false,
});

User.hasMany(User, {
  as: 'approvedUsers',
  foreignKey: 'approvedBy',
  constraints: false,
});

const models = {
  User,
  sequelize,
};

module.exports = models;