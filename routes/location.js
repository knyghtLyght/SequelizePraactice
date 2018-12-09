const router = require("express").Router(); // eslint-disable-line
const Location = require('../models/Location');

module.exports = router;

// Get all locations endpoint
router.get('/', (req, res, next) => {
  Location.findAll()
    .then(results => res.send(results))
    .catch(next);
});

// Post endpoint. Check if location laready exists beofre adding to db
router.post('/', (req, res, next) => {
  Location.findOrCreate({
    where: req.body
  })
    .then(results => res.send(results))
    .catch(next);
});

// Get location by Id
router.get('/:id', (req, res, next) => {
  Location.findById(req.params.id)
    .then(results => res.send(results))
    .catch(next);
});
