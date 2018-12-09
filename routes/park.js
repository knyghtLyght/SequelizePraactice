const router = require('express').Router();

const Park = require('../models/Park');
const Location = require('../models/Location');
const Puppy = require('../models/Puppy');

module.exports = router;

// Get all endpoint
router.get('/', (req, res, next) => {
  Park.findAll()
    .then(results => res.send(results))
    .catch(next);
});

// Post endpoint
router.post('/', (req, res, next) => {
  Park.findOrCreate({
    where: req.body
  })
    .then(results => res.send(results))
    .catch(next);
});

// Get Park by id
router.get('/:id', (req, res, next) => {
  Park.findById(req.body)
    .then(results => res.send(results))
    .catch(next);
});

// get by id with the associated puppies
router.get('/:id/puppies', (req, res, next) => {
  Park.findById(req.params.id, {
    include: [Puppy]
  })
    .then(results => res.send(results))
    .catch(next);
});

// update the location of a park
// needs a locationId prop in the req.body
router.put('/:id/location', (req, res, next) => {
  Park.findById(req.params.id)
    .then(foundPark => {
      if (!foundPark) res.sendStatus(404);
      return foundPark.setLocation(req.body.locationId);
      // return foundPark.update({locationId: req.body.locationId})
    })
    .then(res.send.bind(res))
    .catch(next);
});
