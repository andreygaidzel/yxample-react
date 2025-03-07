const express = require('express');
const { getUserByEmail, replaceUserWishList } = require('../data/user');
const { getProductById } = require('../data/products');
const { checkAuth, getEmailFromToken } = require('../util/auth');

const router = express.Router();

router.use(checkAuth);

router.get('/products', async (req, res) => {
  const email = getEmailFromToken(req.headers.authorization);
  const { wishlist } = await getUserByEmail(email);

  const products = await Promise.all(wishlist.map(async id => {
    return await getProductById(id);
  }));

  res.json({ wishlist: products });
});

router.patch('/products', async (req, res, next) => {
  const data = req.body;
  const email = getEmailFromToken(req.headers.authorization);

  let errors = {};

  if (data.some(id => !Number.isInteger(id))) {
    errors.array = 'Invalid id';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the wishlist failed due to validation errors.',
      errors,
    });
  }

  try {
    await replaceUserWishList(email, data);
    res.json({ message: 'Wishlist updated.', wishlist: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
