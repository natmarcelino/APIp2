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
    
    // CORREÇÃO: categoryId deve ser UUID pois o model Category usa UUID
    categoryId: DataTypes.UUID,
    
    // CORREÇÃO: userId deve ser INTEGER pois o model User usa INTEGER
    userId: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Occurrence',
    tableName: 'Occurrences' // Boa prática: definir nome da tabela explicitamente
  });

  return Occurrence;
};