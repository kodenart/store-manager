const httpStatus = require('../utils/httpStatus');
const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  const result = await salesService.getAll();
  return res.status(httpStatus.OK).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await salesService.getById(id);
  if (result.code && result.message) return next(result);
  return res.status(httpStatus.OK).json(result);
};

const create = async (req, res, next) => {
  const salesArr = req.body;
  const sales = await salesService.createSale(salesArr);
  if (sales.code && sales.message) return next(sales);
  res.status(httpStatus.CREATED).json(sales);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const salesArr = req.body;
  const sales = await salesService.updateSales(id, salesArr);
  if (sales.code && sales.message) return next(sales);
  return res.status(httpStatus.OK).json(sales);
};

const exclude = async (req, res, next) => {
  const { id } = req.params;
  const result = await salesService.excludeSale(id);
  if (result.code && result.message) return next(result);
  return res.status(httpStatus.NO_CONTENT).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};