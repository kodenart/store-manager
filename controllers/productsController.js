const httpStatus = require('../utils/httpStatus');
const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const result = await productsService.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await productsService.getById(id);
  if (result.code && result.message) return next(result);
  return res.status(httpStatus.OK).json(result);
};

const add = async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await productsService.add(name, quantity);
  if (product.code && product.message) return next(product);
  return res.status(httpStatus.CREATED).json(product);
};

module.exports = {
  getAll,
  getById,
  add,
};