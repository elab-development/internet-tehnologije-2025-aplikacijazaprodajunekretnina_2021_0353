'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Proveravamo prvo da li kolona već postoji (za svaki slučaj)
        const tableInfo = await queryInterface.describeTable('Properties');
        if (!tableInfo.imageUrl) {
            await queryInterface.addColumn('Properties', 'imageUrl', {
                type: Sequelize.STRING,
                allowNull: true
            });
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Properties', 'imageUrl');
    }
};
