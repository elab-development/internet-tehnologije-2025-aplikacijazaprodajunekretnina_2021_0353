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
// const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// router.use(authenticateToken);
// router.use(authorizeRoles('admin', 'agent'));

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;