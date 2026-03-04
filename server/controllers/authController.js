const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const register = async (req, res) => {
    try {
        const { name, email, password, roleName } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Korisnik sa tim emailom vec postoji' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Default rola ukoliko prosledjena ne postoji
        let userRole = await Role.findOne({ where: { name: roleName || 'klijent' } });
        if (!userRole) {
            userRole = await Role.create({ name: roleName || 'klijent' });
        }

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            roleId: userRole.id
        });

        res.status(201).json({ message: 'Registracija uspesna', user: { id: newUser.id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ error: 'Greska prilikom registracije' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Prevencija SQL injectiona (Sequelize Query pozivi automatski parametrizuju upite)
        const user = await User.findOne({ where: { email }, include: ['role'] });
        if (!user) {
            return res.status(401).json({ error: 'Pogresan email ili lozinka' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Pogresan email ili lozinka' });
        }

        // Zahtev za zastitu, jwt token
        const token = jwt.sign(
            { id: user.id, role: user.role ? user.role.name : 'klijent' },
            process.env.JWT_SECRET || 'super_secret_crm_key',
            { expiresIn: '1d' }
        );

        res.status(200).json({ message: 'Login uspesan', token, user: { id: user.id, name: user.name, role: user.role ? user.role.name : 'klijent' } });
    } catch (error) {
        res.status(500).json({ error: 'Greska prilikom logovanja' });
    }
};

module.exports = { register, login };
