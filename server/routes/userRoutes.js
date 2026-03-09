const express = require('express');
const router = express.Router();
const { User, Role } = require('../models');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.use(authenticateToken);
router.use(authorizeRoles('admin')); // Only admins can manage users

// GET all users (agents/admins)
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Role, as: 'role' }],
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška pri dobavljanju korisnika' });
    }
});

// Update user role
router.put('/:id/role', async (req, res) => {
    try {
        const { roleName } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Korisnik nije pronađen' });

        const role = await Role.findOne({ where: { name: roleName } });
        if (!role) return res.status(400).json({ error: 'Rola nije pronađena' });

        await user.update({ roleId: role.id });
        res.status(200).json({ message: 'Rola uspešno ažurirana' });
    } catch (error) {
        res.status(500).json({ error: 'Greška pri ažuriranju role' });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Korisnik nije pronađen' });

        await user.destroy();
        res.status(200).json({ message: 'Korisnik obrisan' });
    } catch (error) {
        res.status(500).json({ error: 'Greška pri brisanju korisnika' });
    }
});

module.exports = router;
