const express = require('express');
const { add, get } = require('../data/user');
const { get: getProduct } = require('../data/products');
const { decodeJSONToken, isValidPassword, checkAuth } = require('../util/auth');

const router = express.Router();

router.use(checkAuth);

router.get('/me', async (req, res) => {
  const [, token] = req.headers.authorization.split(' ');

  let email;
  try {
    const tokenData = decodeJSONToken(token);
    email = tokenData.email;
  } catch (error) {
    return res.status(401).json({ message: 'Token not parsed' });
  }

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed.' });
  }

  const { id } = user;

  res.json({ user: { id, email } });
});

router.get('/cart', async (req, res) => {
  const [, token] = req.headers.authorization.split(' ');

  let email;
  try {
    const tokenData = decodeJSONToken(token);
    email = tokenData.email;
  } catch (error) {
    return res.status(401).json({ message: 'Token not parsed' });
  }

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed.' });
  }

  const { cart } = user;
  cart.cartItems = await cart.cartItems.map(async item => {
    console.log(item);
    return { ...item, product: await getProductById(item.productId) }
  });
  console.log(cart.cartItems);
  res.json({ cart });
});

async function getProductById(id) {
  let product;
  try {
    product = await getProduct(id);
  } catch (error) {
    return res.status(401).json({ message: 'Product not found' });
  }

  return product;
}

module.exports = router;
