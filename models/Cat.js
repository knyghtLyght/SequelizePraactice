const Sequelize = require('sequelize');
const db = require('../db');

const Cat = db.define('kitten', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  age: Sequelize.INTEGER
});

module.exports = Cat;
