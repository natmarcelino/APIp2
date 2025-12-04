'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductSituation extends Model {
    static associate(models) {
      ProductSituation.hasMany(models.Product, {
        foreignKey: 'productSituationId',
        as: 'products'
      });
    }
  }

  ProductSituation.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductSituation',
    tableName: 'ProductSituations'
  });

  return ProductSituation;
};
