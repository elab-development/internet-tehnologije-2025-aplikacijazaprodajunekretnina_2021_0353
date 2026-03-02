'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      Property.belongsTo(models.User, { foreignKey: 'userId', as: 'agent' });
      Property.hasMany(models.Interaction, { foreignKey: 'propertyId', as: 'interactions' });
    }
  }
  Property.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    location: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};