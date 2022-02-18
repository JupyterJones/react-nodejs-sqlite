'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../../config/database.js');

const db = {};

const sequelize = new Sequelize(config);

fs
  .readdirSync(__dirname)
  .filter(file =>
  {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file =>
  {
    // Original:
    //pre update const model = sequelize['import'](path.join(__dirname, file));
    //changed to:
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    // Change per https://stackoverflow.com/questions/62917111/sequelize-import-is-not-a-function
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName =>
{
  if (db[modelName].associate)
  {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
