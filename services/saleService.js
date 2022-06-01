const saleModel = require('../models/saleModel');

const getAll = async () => {
  const result = await saleModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await saleModel.getById(id);
  return result;
};

module.exports = {
  getAll,
  getById,
};