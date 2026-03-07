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
        console.error("DEBUG - Database connection failed, returning dummy data:", error.message);

        // Fallback na dummy podatke direktno sa backenda ako baza ne radi
        const dummyProperties = [
            {
                id: 1,
                title: "Luksuzan stan u centru (Demo)",
                description: "Ovo su probni podaci jer baza trenutno nije dostupna.",
                price: 250000,
                status: "available",
                location: "Knez Mihailova 1, Beograd",
                address: "Knez Mihailova 1",
                city: "Beograd",
                imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                agent: { name: "Test Agent", email: "agent@example.com" }
            },
            {
                id: 2,
                title: "Porodična kuća sa dvorištem (Demo)",
                description: "Kuća pogodna za porodicu, na periferiji u mirnom kraju.",
                price: 180000,
                status: "sold",
                location: "Zemunska 12, Zemun",
                address: "Zemunska 12",
                city: "Zemun",
                imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                agent: { name: "Test Agent", email: "agent@example.com" }
            }
        ];

        res.status(200).json(dummyProperties);
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
        // Fallback za demo
        res.status(200).json({
            id: req.params.id,
            title: "Demo Nekretnina",
            description: "Prikazujem demo jer baza ne radi.",
            price: 100000,
            location: "Nepoznata lokacija",
            agent: { name: "Test Agent" }
        });
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
