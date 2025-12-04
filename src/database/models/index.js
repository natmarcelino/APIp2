'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Remove caracteres invisíveis do basename (**CORREÇÃO PRINCIPAL**)
const basename = path.basename(__filename).replace(/[\uFEFF\u200B]/g, '');

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/sequelizeConfig')[env];

const db = {};

const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
  logging: false,
});

// CORREÇÃO: ignorar arquivos inválidos e INDEX duplicado
fs.readdirSync(__dirname)
  .filter(file => {
    const clean = file.replace(/[\uFEFF\u200B]/g, '');
    return (
      clean.indexOf('.') !== 0 &&
      clean !== basename &&
      clean.endsWith('.js') &&
      clean !== 'index.js' // ignora forçado
    );
  })
  .forEach(file => {
    const clean = file.replace(/[\uFEFF\u200B]/g, '');

    console.log("CARREGANDO MODEL:", clean);

    const modelDef = require(path.join(__dirname, clean));

    if (typeof modelDef === 'function') {
      const model = modelDef(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } else {
      console.error("ARQUIVO QUEBROU O SEQUELIZE:", clean);
    }
  });

// Rodar associações
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
