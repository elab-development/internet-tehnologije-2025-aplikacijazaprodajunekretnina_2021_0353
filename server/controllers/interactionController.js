const { Interaction, Client, Property, User } = require('../models');

// GET all interactions
const getAllInteractions = async (req, res) => {
    try {
        const interactions = await Interaction.findAll({
            include: [
                { model: Client, as: 'client', attributes: ['fullName', 'email'] },
                { model: Property, as: 'property', attributes: ['title'] },
                { model: User, as: 'agent', attributes: ['name'] }
            ],
            order: [['date', 'DESC']]
        });
        res.status(200).json(interactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška pri dobavljanju interakcija' });
    }
};

// CREATE interaction
const createInteraction = async (req, res) => {
    try {
        const { type, date, notes, clientId, propertyId, agentId } = req.body;

        // Ako je ulogovan agent/admin, on je 'agent' u interakciji
        // Ako je ulogovan klijent, on šalje upit AGENTU koji je vlasnik nekretnine
        const userId = (req.user.role === 'klijent' && agentId) ? agentId : req.user.id;

        const newInteraction = await Interaction.create({
            type: type || 'upit',
            date: date || new Date(),
            notes: req.user.role === 'klijent' ? `Upit od korisnika ${req.user.name}: ${notes}` : notes,
            clientId: clientId || null,
            propertyId,
            userId
        });

        res.status(201).json(newInteraction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška pri kreiranju interakcije' });
    }
};

// DELETE interaction
const deleteInteraction = async (req, res) => {
    try {
        const interaction = await Interaction.findByPk(req.params.id);
        if (!interaction) return res.status(404).json({ error: 'Interakcija nije nađena' });

        await interaction.destroy();
        res.status(200).json({ message: 'Interakcija uspešno obrisana' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška pri brisanju interakcije' });
    }
};

module.exports = {
    getAllInteractions,
    createInteraction,
    deleteInteraction
};
