const router = require("express").Router(); // eslint-disable-line
const Puppy = require('../models/Puppy'); //Our actual db model

module.exports = router;

//Get all puppies endpoint
router.get('/', (req, res, next) => {
  Puppy.findAll({
    where: req.query,
    include: [{ all: true }]
  })
    .then(result => res.send(result))
    .catch(next);
});

//Single puppy endpoint
router.get('/:id', (req, res, next) => {
  Puppy.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(puppy => {
      if (!puppy) res.send('Not found');
      else {
        console.log(puppy.greet());
        res.send(puppy);
      }
    })
    .catch(next);
});

//Puppy Update endpoint
router.put('/:id', (req, res) => {
  let puppy = Puppy.findOne({
    where: {
      id: req.params.id
    }
  });
  Object.assign(puppy, req.body);
  res.send(puppy);
});

//New puppy endpoint
router.post('/', (req, res) => {
  Puppy.create(req.body).then(puppy => {
    res.send(puppy);
  });
});
