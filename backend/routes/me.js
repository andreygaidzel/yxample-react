const express = require('express');
const { getUserByEmail } = require('../data/user');
const { checkAuth, getEmailFromToken } = require('../util/auth');

const router = express.Router();

router.use(checkAuth);

router.get('/me', async (req, res) => {
  const email = getEmailFromToken(req.headers.authorization);
  const { id } = await getUserByEmail(email);

  res.json({ user: { id, email } });
});

module.exports = router;
