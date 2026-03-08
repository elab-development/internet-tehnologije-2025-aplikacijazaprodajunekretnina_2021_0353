const axios = require('axios');

// 1. Eksterni API: Exchange rates
const getExchangeRates = async (req, res) => {
    try {
        const response = await axios.get('https://open.er-api.com/v6/latest/EUR');
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Greška pri dohvaćanju kurseva:', error.message);
        res.status(500).json({ error: 'Nije moguće povući kurseve valuta' });
    }
};

// 2. Eksterni API: Unsplash Images
const getUnsplashImages = async (req, res) => {
    try {
        const query = req.query.query || 'real estate';
        const apiKey = process.env.UNSPLASH_ACCESS_KEY;

        if (!apiKey) {
            // Pseudo-random fallback: Lista lepih slika nekretnina koje se rotiraju
            const fallbackImages = [
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1513584684031-43d174826131?auto=format&fit=crop&w=1000&q=80"
            ];
            const randomImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

            return res.status(200).json({
                message: "Unsplash API ključ nije postavljen. Rotiram predefinisane slike.",
                image: randomImage
            });
        }

        const response = await axios.get(`https://api.unsplash.com/photos/random`, {
            params: { query, count: 1 },
            headers: { Authorization: `Client-ID ${apiKey}` }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Greška pri dohvaćanju Unsplash slika:', error.message);
        res.status(500).json({ error: 'Nije moguće povući slike sa Unsplash-a' });
    }
};

module.exports = {
    getExchangeRates,
    getUnsplashImages
};
