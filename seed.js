// Bluebird allows us to Promis.map
const Promise = require('bluebird');
//Colors lets us make logging more readable by adding colored output
const colors = require("colors"); // eslint-disable-line
// Bring in the db and all the models to seed
const db = require('./db');
const Puppy = require('./models/Puppy');
const Park = require('./models/Park');
const Location = require('./models/Location');
const Food = require('./models/Food');

// The actual seed data
const locationData = [
  {
    address: '11th Floor, 5 Hanover Square, NY'
  },
  {
    address: '450 Flatbush Ave, Brooklyn'
  },
  {
    address: 'Washington Square, NY'
  }
];

const puppyData = [
  {
    firstName: 'Puppy',
    lastName: 'Doggo',
    age: 1
  },
  {
    firstName: 'Pupster',
    lastName: 'Puppo',
    age: 2
  },
  {
    firstName: 'Mr.',
    lastName: 'Puppyface',
    age: 3
  },
  {
    firstName: 'Ham',
    lastName: 'Sandwich',
    age: 1
  },
  {
    firstName: 'Jon',
    lastName: 'MacPuppald',
    age: 2
  },
  {
    firstName: 'Omri',
    lastName: 'Puppstein',
    age: 1
  }
];

const foodData = [
  {
    name: 'pizza',
    deliciousness: 4
  },
  {
    name: 'dumplings',
    deliciousness: 5
  },
  {
    name: 'lettuce',
    deliciousness: 3
  },
  {
    name: 'kao soi',
    deliciousness: 5
  },
  {
    name: 'cheetos',
    deliciousness: 5
  }
];

const parkData = [
  {
    name: 'Fullstack Park'
  },
  {
    name: 'Prospect Park'
  },
  {
    name: 'Washington Square Park'
  }
];

//Sync and restart the db before seeding
db.sync({ force: true })
  .then(() => {
    console.log('Synced db and dropped old tables'.yellow);
  })
  .then(() => {
    return Promise.map(locationData, function(location) {
      return Location.create(location);
    });
  })
  .then(createdLocations => {
    console.log(`${createdLocations.length} locations created`.green);
  })
  .then(() => {
    return Promise.map(puppyData, puppy => Puppy.create(puppy));
  })
  .then(createdPuppies => {
    console.log(`${createdPuppies.length} puppies created`.green);
  })
  .then(() => {
    return Promise.map(foodData, food => Food.create(food));
  })
  .then(createdFoods => {
    console.log(`${createdFoods.length} foods created`.green);
  })
  .then(() => {
    return Promise.map(parkData, park => Park.create(park));
  })
  .then(createdParks => {
    console.log(`${createdParks.length} parks created`.green);
  })
  .then(() => {
    console.log('Seeded successfully'.green);
  })
  .catch(err => {
    console.error('Error!', err, err.stack);
  })
  .finally(() => {
    db.close();
    console.log('Finished!'.green);
    return null;
  });
