const express = require('express');
const router = express.Router();
const { getExchangeRates, getUnsplashImages } = require('../controllers/externalApiController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Zaštita ruta: dostupne samo ulogovanim korisnicima (svim ulogama)
router.use(authenticateToken);

router.get('/rates', getExchangeRates);
router.get('/unsplash', getUnsplashImages);

module.exports = router;
