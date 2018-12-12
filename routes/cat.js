const router = require("express").Router(); // eslint-disable-line
const Cat = require('../models/Cat');

module.exports = router;

//Get all cats endpoint
router.get('/', (req, res, next) => {
  Cat.findAll({
    include: [{ all: true }]
  })
    .then(result => res.send(result))
    .catch(next);
});

//Single Cat endpoint
router.get('/:id', (req, res, next) => {
  Cat.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(kitten => {
      if (!kitten) res.send('Not found');
      else {
        console.log(kitten.greet());
        res.send(kitten);
      }
    })
    .catch(next);
});

//Update a fav food.
//addFavFood will add an to the through table while setFavFood will overwrite the table
router.put('/:id/food', (req, res, next) => {
  Cat.findById(req.params.id)
    .then(kitten => {
      kitten.addFavFoods(req.body.foodId);
      return kitten;
    })
    .then(results => res.send(results))
    .catch(next);
});

//Cat Update endpoint
router.put('/:id', (req, res) => {
  let kitten = Cat.findOne({
    where: {
      id: req.params.id
    }
  });
  Object.assign(kitten, req.body);
  res.send(kitten);
});

//New Cat endpoint
router.post('/', (req, res) => {
  Cat.create(req.body).then(kitten => {
    res.send(kitten);
  });
});
