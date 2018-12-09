const Sequelize = require('sequelize');
const config = require('./config/config'); //config file for incresed modularity

const db = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

module.exports = db;
