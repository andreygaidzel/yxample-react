const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData } = require('./util');

async function get() {
  const storedData = await readData();
  if (!storedData.feature) {
    throw new NotFoundError('Could not find any feature.');
  }

  const feature = storedData.feature;
  if (!feature) {
    throw new NotFoundError('Could not find feature');
  }

  return feature;
}

exports.get = get;
