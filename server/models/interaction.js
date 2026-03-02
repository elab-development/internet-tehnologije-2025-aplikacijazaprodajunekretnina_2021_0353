'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    static associate(models) {
      Interaction.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
      Interaction.belongsTo(models.Property, { foreignKey: 'propertyId', as: 'property' });
      Interaction.belongsTo(models.User, { foreignKey: 'userId', as: 'agent' });
    }
  }
  Interaction.init({
    type: DataTypes.STRING,
    date: DataTypes.DATE,
    notes: DataTypes.TEXT,
    clientId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Interaction',
  });
  return Interaction;
};