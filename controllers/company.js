const Company = require('../models/Company.js');
const User = require('../models/User.js');

exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll({ include: User });
        const users = await User.findAll({ attributes: ['id', 'name'] })
        res.status(200).json({ companies, users });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.createCompany = async (req, res) => {
    try {
        const newCompany = await Company.create(req.body);
        const company = await Company.findByPk(newCompany.id, { include: User });

        res.status(200).json({ company });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        await Company.update(req.body, { where: { id } });

        const company = await Company.findByPk(id, { include: User });
        res.status(200).json({ company });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findByPk(id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        await company.destroy();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error });
    }
};
