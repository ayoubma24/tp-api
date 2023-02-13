const Sequelize = require('sequelize');
const sequelize = require('../db/index.js');
const Client = require('./Client.js')

const Contract = sequelize.define('Contract', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    deliverable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    document: {
        type: Sequelize.STRING,
    },
    documentOriginalName: {
        type: Sequelize.STRING
    },
});

Contract.belongsTo(Client, { onDelete: 'set null' });

module.exports = Contract;