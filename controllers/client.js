const Client = require('../models/Client.js');
const Company = require('../models/Company.js');

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.findAll({ include: Company });
        const companies = await Company.findAll({})
        res.status(200).json({ clients, companies });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.createClient = async (req, res) => {
    try {        
        const newClient = await Client.create(req.body);
        const client = await Client.findByPk(newClient.id, { include: Company });

        res.status(200).json({ client });
    } catch (error) {
        res.status(500).
            json({ error });
    }
};

exports.updateClient = async (req, res) => {
    try {
        await Client.update(req.body, { where: { id: req.params.id } });

        const client = await Client.findByPk(req.params.id, { include: Company });
        res.status(200).json({ client });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        await client.destroy();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error });
    }
};