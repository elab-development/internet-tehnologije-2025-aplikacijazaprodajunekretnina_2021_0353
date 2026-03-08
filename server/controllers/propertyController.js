const { Property, User } = require('../models');

// GET all properties
const getAllProperties = async (req, res) => {
    try {
        console.log("Fetching all properties...");
        let whereClause = {};
        // Ako je korisnik ulogovan i agent, vidi samo svoje nekretnine
        if (req.user && req.user.role === 'agent') {
            whereClause.userId = req.user.id;
        }

        const properties = await Property.findAll({
            where: whereClause,
            include: [{ model: User, as: 'agent', attributes: ['id', 'name', 'email'] }]
        });
        console.log(`Found ${properties.length} properties.`);
        res.status(200).json(properties);
    } catch (error) {
        console.error("Greška pri dohvatanju nekretnina:", error);
        res.status(500).json({ error: 'Greška na serveru prilikom dohvatanja nekretnina' });
    }
};

// GET single property
const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id, {
            include: [{ model: User, as: 'agent', attributes: ['id', 'name', 'email'] }]
        });
        if (!property) return res.status(404).json({ error: 'Nekretnina nije našena' });

        // Odbrana od IDOR (Agent može videti samo svoju nekretninu)
        if (req.user && req.user.role === 'agent' && property.userId !== req.user.id) {
            return res.status(403).json({ error: 'Nemate pravo pristupa ovoj nekretnini' });
        }

        res.status(200).json(property);
    } catch (error) {
        console.error("DEBUG - Error in getPropertyById:", error.message);
        res.status(500).json({ error: 'Greška na serveru' });
    }
};

// CREATE property
const createProperty = async (req, res) => {
    try {
        const { title, description, price, location } = req.body;
        const newProperty = await Property.create({
            title,
            description,
            price,
            location,
            userId: req.user.id // Vežemo za trenutnog ulogovanog agenta/admina
        });
        res.status(201).json(newProperty);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška pri kreiranju nekretnine' });
    }
};

// UPDATE property
const updateProperty = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (!property) return res.status(404).json({ error: 'Nekretnina nije našena' });

        // Odbrana od IDOR (samo admin ili vlasnik mogu da menjaju)
        if (req.user.role === 'agent' && property.userId !== req.user.id) {
            return res.status(403).json({ error: 'Nemate pravo izmene ove nekretnine' });
        }

        const { title, description, price, location } = req.body;
        await property.update({ title, description, price, location });

        res.status(200).json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška pri izmeni nekretnine' });
    }
};

// DELETE property
const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (!property) return res.status(404).json({ error: 'Nekretnina nije našena' });

        // Odbrana od IDOR
        if (req.user.role === 'agent' && property.userId !== req.user.id) {
            return res.status(403).json({ error: 'Nemate pravo brisanja ove nekretnine' });
        }

        await property.destroy();
        res.status(200).json({ message: 'Nekretnina uspešno obrisana' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška pri brisanju nekretnine' });
    }
};

module.exports = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
};
