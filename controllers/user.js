const User = require('../models/User.js')
const bcrypt = require('bcrypt')

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        return res.status(200).json({ users })
    } catch (error) {
        return res.status(500).json({ error })
    }
}

exports.createUser = async (req, res) => {
    try {
        const exist = await User.findOne({ where: { email: req.body.email } })
        if (exist) {
            return res.status(400).json({ error: 'Email already exists' })
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const user = await User.create(req.body)
        return res.status(200).json({ user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params

        delete req.body.password

        const [updated] = await User.update(req.body, { where: { id } })
        if (!updated) {
            return res.status(404).json({ error: 'User not updated' })
        }

        const user = await User.findByPk(id)
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ error })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await User.destroy({
            where: { id }
        })
        if (!deleted) {
            return res.status(404).json({ error: 'User not found' })
        }
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
