const Sequelize = require('sequelize');
const sequelize = require('../db/index.js');

const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.ENUM,
        values: ['admin', 'provider'],
        defaultValue: 'provider',
    },
});


module.exports = User;
