const productService = require('../services/productService');

const getAll = async (req, res) => {
  const result = await productService.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productService.getById(id);
  res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
};