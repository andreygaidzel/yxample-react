const bodyParser = require('body-parser');
const express = require('express');

const authRoutes = require('./routes/auth');
const featureToggleRoutes = require('./routes/feature-toggle');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const meRoutes = require('./routes/me');
const wishlistRoutes = require('./routes/wishlist');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(authRoutes);

app.use('/feature-toggle', featureToggleRoutes);
app.use('/categories', categoriesRoutes);
app.use('/products', productsRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/cart', cartRoutes);

app.use(meRoutes);

app.use((error, req, res) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(8080);
