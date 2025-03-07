const express = require('express');
const { get } = require('../data/feature');
const { checkAuth } = require('../util/auth');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const feature = await get();
    res.json({ feature });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

module.exports = router;
