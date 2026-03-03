const { Client } = require('../models');

// GET all clients
const getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška pri dobavljanju klijenata' });
    }
};

// GET single client
const getClientById = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ error: 'Klijent nije nađen' });
        res.status(200).json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška pri dobavljanju klijenta' });
    }
};

// CREATE client
const createClient = async (req, res) => {
    try {
        const { fullName, email, phone } = req.body;
        const newClient = await Client.create({
            fullName, email, phone
        });
        res.status(201).json(newClient);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Klijent sa ovim emailom već postoji' });
        }
        console.error(error);
        res.status(500).json({ error: 'Greška pri kreiranju klijenta' });
    }
};

// UPDATE client
const updateClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ error: 'Klijent nije nađen' });

        const { fullName, email, phone } = req.body;
        await client.update({ fullName, email, phone });

        res.status(200).json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška pri izmeni klijenta' });
    }
};

// DELETE client
const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ error: 'Klijent nije nađen' });

        await client.destroy();
        res.status(200).json({ message: 'Klijent uspešno obrisan' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška pri brisanju klijenta' });
    }
};

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
};
