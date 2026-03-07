const { Property, Client, Interaction } = require('../models');

const getStats = async (req, res) => {
    try {
        const propertyCount = await Property.count();
        const clientCount = await Client.count();
        const interactionCount = await Interaction.count();

        res.status(200).json({
            propertyCount,
            clientCount,
            interactionCount
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: 'Greška pri dobavljanju statistike' });
    }
};

module.exports = {
    getStats
};
