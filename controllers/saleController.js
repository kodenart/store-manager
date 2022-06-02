const saleService = require('../services/saleService');

const getAll = async (req, res) => {
  const result = await saleService.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await saleService.getById(id);
  res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
};