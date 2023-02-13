const Sequelize = require('sequelize');
const sequelize = require('../db/index.js');
const User = require('./User.js')

const Company = sequelize.define('Company', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
    },
});

User.hasMany(Company, { onDelete: 'set null' });
Company.belongsTo(User, { onDelete: 'set null' });

module.exports = Company;
