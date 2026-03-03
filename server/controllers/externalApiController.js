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
            // Ako nemamo ključ, vraćamo mock podatke ili koristimo slobodan servis kao fallback
            return res.status(200).json({
                message: "Unsplash API ključ nije postavljen. Mock slika se vraća.",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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
