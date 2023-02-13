const Contract = require('../models/Contract.js')
const Transaction = require('../models/Transaction.js')
const User = require('../models/User.js')

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ include: Contract })
        const contracts = await Contract.findAll({})
        const users = await User.findAll({})
        return res.status(200).json({ transactions, contracts, users })
    } catch (error) {
        return res.status(500).json({ error })
    }
}


exports.createTransaction = async (req, res) => {
    try {
        const newTransaction = await Transaction.create(req.body)

        const transaction = await Transaction.findByPk(newTransaction.id, {
            include: [Contract, User]
        })
        return res.status(200).json({ transaction })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const [updated] = await Transaction.update(req.body, {
            where: { id }
        })
        if (!updated) {
            return res.status(404).json({ error: 'Transaction not found' })
        }
        const transaction = await Transaction.findByPk(id, {
            include: [Contract, User]
        })
        return res.status(200).json({ transaction })
    } catch (error) {
        return res.status(500).json({ error })
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Transaction.destroy({
            where: { id }
        })
        if (!deleted) {
            return res.status(404).json({ error: 'Transaction not found' })
        }
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
