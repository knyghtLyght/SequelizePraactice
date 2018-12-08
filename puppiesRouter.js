const router = require('express').Router();
const puppies = require('./puppies');

module.exports = router;

//Get all puppies route
router.get('/', function(req, res) {
  res.send(puppies);
});

//Single puppy get endpoint with optional quety string
router.get('/:id', function(req, res) {
  const id = req.params.id; //Pull the id param from the uri
  const query = req.query; //pull the query string from the uri
  const puppy = puppies[id];
  const responses = {};
  const isEmptyQuery = Object.keys(query).length;
  if (!isEmptyQuery) {
    res.send(puppy);
  } else {
    Object.keys(query).forEach(function(key) {
      responses[key] = puppy[key];
    });
    res.send(responses);
  }
});

// Update endpoint
router.put('/:id', function(req, res) {
  let puppy = puppies[req.params.id];
  Object.assign(puppy, req.body);
  res.send(puppy);
});

router.post('/', function(req, res) {
  var puppy = req.body;
  puppies.push(puppy);
  res.redirect('/puppies');
});
