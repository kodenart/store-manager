const salesModel = require('../models/salesModel');

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result.length === 0) return { code: 'NOT_FOUND', message: 'Sale not found' };
  return result;
};

module.exports = {
  getAll,
  getById,
};