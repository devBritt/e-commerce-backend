const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({ include: [Product] })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: err });
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne({ where: {id: req.params.id}, include: [Product] })
  .then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with that id' });
        return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: err });
  });
});

router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      tag_name: "athletic",
    }
  */
  Tag.create({
    tag_name: req.body.tag_name
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, { where: { id: req.params.id } })
  .then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with that id' });
        return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: err });
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
  .then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with that id' });
        return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: err });
  });
});

module.exports = router;
