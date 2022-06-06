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

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await productsService.update(id, name, quantity);
  if (product.code && product.message) return next(product);
  return res.status(httpStatus.OK).json({ id, name, quantity });
};

const exclude = async (req, res, next) => {
  const { id } = req.params;
  const productDelete = await productsService.exclude(id);
  if (productDelete.code && productDelete.message) return next(productDelete); 
  return res.status(httpStatus.NO_CONTENT).end();
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
};