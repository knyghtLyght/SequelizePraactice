const express = require('express'); //Core server framework
const volleyball = require('volleyball'); //Logging middleware
const colors = require("colors"); // eslint-disable-line
const config = require('./config/config'); //config file for incresed modularity
const bodyParser = require('body-parser'); //Helps us handle http requests
const path = require('path'); //Built in node module that handles path minipulation
const puppiesRouter = require('./routes/puppiesRouter'); //Holds all the routes that dael with puppies
const foodsRouter = require('./routes/foods');
const parksRouter = require('./routes/park');
const locationsRouter = require('./routes/location');
const catRouter = require('./routes/cat');
const db = require('./db');

//Init our server instance
const app = express();

//Init logging middleware
app.use(volleyball);
//Init bodyparser to handle json
app.use(bodyParser.json());

//Serve up the public folder contents for static files
app.use(express.static(path.join(__dirname, 'public')));

//Establish our base route for all models
app.use('/puppies', puppiesRouter);
app.use('/foods', foodsRouter);
app.use('/parks', parksRouter);
app.use('/locations', locationsRouter);
app.use('/cats', catRouter);

//Establish our default route if the user searches for something that is not there
app.use('*', (req, res) => {
  res.send('this is the default route');
});

//Start our server
const server = app.listen(config.port, () => {
  console.log('listening on port'.green, server.address().port);
  //Sync our database
  db.sync({ force: false }).then(() => {
    console.log('db is synced'.green);
  });
});
