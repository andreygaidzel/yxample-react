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

async function get(id) {
  const storedData = await readData();
  if (!storedData.categories || storedData.categories.length === 0) {
    throw new NotFoundError('Could not find any categories.');
  }

  const event = storedData.categories.find((ev) => ev.id === id);
  if (!event) {
    throw new NotFoundError('Could not find categories for id ' + id);
  }

  return event;
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
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
