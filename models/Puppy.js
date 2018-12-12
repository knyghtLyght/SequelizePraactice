const Sequelize = require('sequelize');
const db = require('../db');

const Puppy = db.define(
  'puppy',
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    getterMethods: {
      fullName: function() {
        return this.firstName + ' ' + this.lastName;
      }
    }
  }
);

module.exports = Puppy;
