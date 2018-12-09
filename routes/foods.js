const router = require("express").Router(); // eslint-disable-line
const Food = require('../models/Food');
const Puppy = require('../models/Puppy');

module.exports = router;

// Find all foods endpoint
router.get('/', (req, res, next) => {
  Food.findAll()
    .then(results => res.send(results))
    .catch(next);
});

// Post endpoint
router.post('/', (req, res, next) => {
  Food.create(req.body)
    .then(results => res.send(results))
    .catch(next);
});

// Get food by id
router.get('/:id', (req, res, next) => {
  Food.findById(req.params.id, {
    include: [{ model: Puppy, as: 'puppies' }]
  })
    .then(results => res.send(results))
    .catch(next);
});
