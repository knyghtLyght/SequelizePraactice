const Sequelize = require('sequelize');
const config = require('./config/config'); //config file for incresed modularity

const db = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

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
    faveFood: {
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

module.exports = {
  Puppy: Puppy,
  db: db
};
