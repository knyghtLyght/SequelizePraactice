const express = require('express');
const volleyball = require('volleyball');
const config = require('./config/config');
const bodyParser = require('body-parser');
const puppies = require('./puppies');

const app = express();

app.use(volleyball);
app.use(bodyParser.json());

//Get all puppies route
app.get('/puppies', function(req, res) {
  res.send(puppies);
});

app.get('/puppies/:id', function(req, res) {
  const id = req.params.id; //Pull the id param from the uri
  const query = req.query; //pull the query string from the uri
  const puppy = puppies[id];
  const responses = {};
  Object.keys(query).forEach(function(key) {
    responses[key] = puppy[key];
  });
  res.send(responses);
});

app.post('/puppies', function(req, res) {
  var puppy = req.body;
  puppies.push(puppy);
  res.redirect('/puppies');
});

const server = app.listen(config.port, function() {
  console.log('listening on port', server.address().port);
});
