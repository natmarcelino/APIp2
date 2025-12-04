'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.ProductCategory, {
        foreignKey: 'productCategoryId',
        as: 'category'
      });

      Product.belongsTo(models.ProductSituation, {
        foreignKey: 'productSituationId',
        as: 'situation'
      });
    }
  }

  Product.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    productCategoryId: DataTypes.INTEGER,
    productSituationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products'
  });

  return Product;
};
