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

module.exports = {
  getAll,
  getById,
};