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
      allowNull: false
    },
    favFood: {
      type: Sequelize.STRING
    }
  },
  {
    //Getter methods allow us to have a built in source for combined data
    getterMethods: {
      fullName: function() {
        return this.firstName + ' ' + this.lastName;
      }
    }
  }
);

//instance method example
Puppy.prototype.greet = function() {
  return 'Woo my name is ' + this.fullName;
};

module.exports = Puppy;
