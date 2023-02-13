const Sequelize = require('sequelize');
const sequelize = require('../db/index.js');
const Company = require('./Company.js')

const Client = sequelize.define('Client', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
    },
});

Company.hasMany(Client, { onDelete: 'set null' });
Client.belongsTo(Company, { onDelete: 'set null' });

module.exports = Client;