const express = require('express');
const router = express.Router();
const {
    getAllInteractions,
    createInteraction,
    deleteInteraction
} = require('../controllers/interactionController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.use(authenticateToken);

router.get('/', getAllInteractions);
router.post('/', authorizeRoles('admin', 'agent', 'klijent'), createInteraction);
router.delete('/:id', authorizeRoles('admin'), deleteInteraction);

module.exports = router;
