const express = require('express');
const { getUserByEmail, updateUserCart } = require('../data/user');
const { getProductById } = require('../data/products');
const { checkAuth, getEmailFromToken } = require('../util/auth');

const router = express.Router();

router.use(checkAuth);

router.get('/', async (req, res) => {
  const email = getEmailFromToken(req.headers.authorization);
  const { cart } = await getUserByEmail(email);

  cart.cartItems = await Promise.all(cart.cartItems.map(async item => {
    return { ...item, product: await getProductById(item.productId) }
  }));

  res.json({ cart });
});

router.patch('/', async (req, res, next) => {
  const data = req.body;
  const email = getEmailFromToken(req.headers.authorization);

  let errors = {};

  if (data.items.some(item => !Number.isInteger(item.productId) || !Number.isInteger(item.quantity))) {
    errors.items = 'Invalid items array';
  }

  if (!Number.isInteger(data.version)) {
    errors.version = 'Invalid version';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the cart failed due to validation errors.',
      errors,
    });
  }

  try {
    await updateUserCart(email, data);
    res.json({ ...data, message: 'Cart updated.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
