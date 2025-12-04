'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Occurrence extends Model {
    static associate(models) {
      Occurrence.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });

      Occurrence.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Occurrence.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    categoryId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Occurrence'
  });

  return Occurrence;
};
