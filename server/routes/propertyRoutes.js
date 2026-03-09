const express = require('express');
const router = express.Router();
const {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
} = require('../controllers/propertyController');

// SKROZ ISKLJUČENO PRIVREMENO:
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.use(authenticateToken);

router.get('/', getAllProperties); // Svi ulogovani mogu da vide
router.get('/:id', getPropertyById); // Svi ulogovani mogu da vide detalje

router.post('/', authorizeRoles('admin', 'agent'), createProperty);
router.put('/:id', authorizeRoles('admin', 'agent'), updateProperty);
router.delete('/:id', authorizeRoles('admin', 'agent'), deleteProperty);

module.exports = router;