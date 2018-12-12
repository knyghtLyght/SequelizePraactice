const Sequelize = require('sequelize');
const config = require('./config/config'); //config file for incresed modularity

const db = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

module.exports = db;

// Pull in all the models
const Park = require('./models/Park');
const Food = require('./models/Food');
const Cat = require('./models/Cat');
const Location = require('./models/Location');

//puppy m:m
// Puppy.belongsToMany(Food, { as: 'favFoods', through: 'puppiesFoods' });
//Puppy is broken. It seems to be in the way helper methods work.
//We are moving on to Cats
Cat.belongsToMany(Food, { as: 'favFoods', through: 'catFoods' });
Food.belongsToMany(Cat, { as: 'kittens', through: 'catFoods' });

//Cats have best friend cats
//Represents a same model association
Cat.belongsTo(Cat, { as: 'bestFriend' });

//belongsTo sets a foreign key and gives us the setLocation() and GetLocation() on source model
Park.belongsTo(Location);
