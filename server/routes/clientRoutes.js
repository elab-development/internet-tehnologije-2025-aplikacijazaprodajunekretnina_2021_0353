const express = require('express');
const router = express.Router();
const {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
} = require('../controllers/clientController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.use(authenticateToken);
router.use(authorizeRoles('admin', 'agent')); // Samo admin i agent vide i menjaju klijente

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Vraća listu svih klijenata
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista klijenata uspešno preuzeta
 */
router.get('/', getAllClients);
router.get('/:id', getClientById);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
