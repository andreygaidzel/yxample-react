const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/feature');
const { checkAuth } = require('../util/auth');
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require('../util/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log(123, req.params);
  try {
    const feature = await get();
    res.json({ feature });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

module.exports = router;
