const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({ include: [Product] })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: err });
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({ where: { id: req.params.id }, include: [Product] })
  .then(dbCatgetoryData => {
    if (!dbCatgetoryData) {
        res.status(404).json({ message: 'No category found with that id' });
        return;
    }
    res.json(dbCatgetoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: err });
  });
});

router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      category_name: "Accessories",
    }
  */
 Category.create({
    category_name: req.body.category_name
 })
 .then(dbCategoryData => res.json(dbCategoryData))
 .catch(err => {
    console.log(err);
    res.status(500).json({ message: err });
 });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, { where: { id: req.params.id } })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with that id' });
        return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: err });
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({ where: { id: req.params.id } })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with that id' });
        return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: err });
  });
});

module.exports = router;
