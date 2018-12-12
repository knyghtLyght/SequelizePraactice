const router = require("express").Router(); // eslint-disable-line
const Food = require('../models/Food');
const Cat = require('../models/Cat');

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
  Food.findByPk(req.params.id, {
    include: [{ model: Cat, as: 'kittens' }]
  })
    .then(results => res.send(results))
    .catch(next);
});
