const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) return { code: 'NOT_FOUND', message: 'Product not found' };
  return result;
};

const add = async (name, quantity) => {
  const allNames = await productsModel.getAll()
    .then((result) => result.map((product) => product.name));
  
  if (allNames.includes(name)) {
    return ({ code: 'CONFLICT', message: 'Product already exists' });
  }

  const insertId = await productsModel.add(name, quantity);
  return ({ id: insertId, name, quantity });
};

module.exports = {
  getAll,
  getById,
  add,
};