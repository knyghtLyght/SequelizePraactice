const express = require('express'); //Core server framework
const volleyball = require('volleyball'); //Logging middleware
const config = require('./config/config'); //config file for incresed modularity
const bodyParser = require('body-parser'); //Helps us handle http requests
const path = require('path'); //Built in node module that handles path minipulation
const puppiesRouter = require('./puppiesRouter'); //Holds all the routes that dael with puppies
const db = require('./db').db;

//Init our server instance
const app = express();

//Init logging middleware
app.use(volleyball);
//Init bodyparser to handle json
app.use(bodyParser.json());

//Serve up the public folder contents for static files
app.use(express.static(path.join(__dirname, 'public')));

//Establish our base route for all puppies routes
app.use('/puppies', puppiesRouter);

//Establish our default route if the user searches for something that is not there
app.use('*', function(req, res) {
  res.send('this is the default route');
});

//Start our server
const server = app.listen(config.port, function() {
  console.log('listening on port', server.address().port);
  //Sync our database
  db.sync().then(message => {
    console.log('and db is synced');
  });
});
