const Sequelize = require('sequelize');
const sequelize = require('../db/index.js');
const Contract = require('./Contract.js');
const User = require('./User.js');


const Transaction = sequelize.define('Transaction', {
    name: {
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
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    type: {
        type: Sequelize.ENUM,
        values: ['Deposit', 'Disbursement']
    },
    monthOfArjudication: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    clasification: {
        type: Sequelize.ENUM,
        values: ['Revenue', 'Investment', 'Service Expense', 'Other Expense', 'Dividend'],
    },
});

Transaction.belongsTo(Contract, { onDelete: 'set null' });
Transaction.belongsTo(User, { foreignKey: 'resource', onDelete: 'set null' });

module.exports = Transaction;