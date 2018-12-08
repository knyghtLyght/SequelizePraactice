const express = require('express');
const volleyball = require('volleyball');
const config = require('./config/config');
const bodyParser = require('body-parser');
const path = require('path');
const puppiesRouter = require('./puppiesRouter');

const app = express();

app.use(volleyball);
app.use(bodyParser.json());

//Serve all of the folder content
app.use(express.static(path.join(__dirname, 'public')));

app.use('/puppies', puppiesRouter);

app.use('*', function(req, res) {
  res.send('this is the default route');
});

const server = app.listen(config.port, function() {
  console.log('listening on port', server.address().port);
});
