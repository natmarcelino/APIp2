'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Situation extends Model {
    static associate(models) {
      Situation.hasMany(models.User, {
        foreignKey: 'situationId',
        as: 'users'
      });
    }
  }

  Situation.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameSituation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Situation',
    tableName: 'Situations'
  });

  return Situation;
};
