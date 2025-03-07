const express = require('express');
const { getAll, getProductsByCategoryId, getCategory } = require('../data/categories');
const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log(req.token);
  try {
    const feature = await getAll();
    res.json({ feature });
  } catch (error) {
    next(error);
  }
});

router.get('/popular', async (req, res, next) => {
  console.log(req.token);
  try {
    const feature = await getAll();
    res.json({ features: feature });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const products = await getProductsByCategoryId(req.params.id, req.query.sortBy);
    const category = await getCategory(req.params.id);
    res.json({ products, category });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
