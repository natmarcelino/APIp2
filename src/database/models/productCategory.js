'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.hasMany(models.Product, {
        foreignKey: 'productCategoryId',
        as: 'products'
      });
    }
  }

  ProductCategory.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'ProductCategories'
  });

  return ProductCategory;
};
