const express = require('express');
const router = express.Router();
const {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
} = require('../controllers/propertyController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.use(authenticateToken); // Sve rute zahtevaju login
router.use(authorizeRoles('admin', 'agent')); // Samo admin i agent mogu pristupiti

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;
