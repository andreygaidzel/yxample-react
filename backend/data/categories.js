const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function getAll() {
  const storedData = await readData();
  if (!storedData.categories) {
    throw new NotFoundError('Could not find any categories.');
  }
  return storedData.categories;
}

async function getProductsByCategoryId(id, sortKey) {
  const storedData = await readData();
  if (!storedData.products || storedData.products.length === 0) {
    throw new NotFoundError('Could not find any products.');
  }

  const products = storedData.products.filter((product) => product.categoryId === +id);
  if (!products) {
    throw new NotFoundError('Could not find products for id ' + id);
  }

  const fn = {
    'Featured': (a, b) => +a.popular - +b.popular,
    'Newest': (a, b) => Math.random() - Math.random(),
    'PriceHighLow': (a, b) => b.price - a.price,
    'PriceLowHigh': (a, b) => a.price - b.price,
  }

  return sortKey ? products.sort(fn[sortKey]) : products;
}

async function getCategory(id) {
  const storedData = await readData();
  if (!storedData.categories || storedData.categories.length === 0) {
    throw new NotFoundError('Could not find any categories.');
  }

  const category = storedData.categories.find((c) => c.id === +id);
  if (!category) {
    throw new NotFoundError('Could not find categories for id ' + id);
  }

  return category;
}

async function add(data) {
  const storedData = await readData();
  storedData.categories.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.categories || storedData.categories.length === 0) {
    throw new NotFoundError('Could not find any categories.');
  }

  const index = storedData.categories.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find categories for id ' + id);
  }

  storedData.categories[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.categories.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, categories: updatedData });
}

exports.getAll = getAll;
exports.getProductsByCategoryId = getProductsByCategoryId;
exports.getCategory = getCategory;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
