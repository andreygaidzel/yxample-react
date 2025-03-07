const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function add(data) {
  const storedData = await readData();
  const userId = generateId();
  const hashedPw = await hash(data.password, 12);
  if (!storedData.users) {
    storedData.users = [];
  }
  storedData.users.push({ ...data, password: hashedPw, id: userId });
  await writeData(storedData);
  return { id: userId, email: data.email };
}

async function get(email) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user = storedData.users.find((ev) => ev.email === email);
  if (!user) {
    throw new NotFoundError('Could not find user for email ' + email);
  }

  return user;
}

async function getUserByEmail(email) {
  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res.status(404).json({ message: 'User not found' });
  }

  return user;
}

async function replaceUserWishList(email, arrayIds) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const index = storedData.users.findIndex((user) => user.email === email);
  if (index < 0) {
    throw new NotFoundError('Could not find user for email ' + email);
  }

  storedData.users[index].wishlist = [...arrayIds];

  await writeData(storedData);
}

async function updateUserCart(email, cart) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const index = storedData.users.findIndex((user) => user.email === email);
  if (index < 0) {
    throw new NotFoundError('Could not find user for email ' + email);
  }

  storedData.users[index].cart.cartItems = [ ...cart.items];
  storedData.users[index].cart.version = cart.version;

  await writeData(storedData);
}

exports.add = add;
exports.get = get;
exports.getUserByEmail = getUserByEmail;
exports.replaceUserWishList = replaceUserWishList;
exports.updateUserCart = updateUserCart;
