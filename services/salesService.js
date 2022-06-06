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

const createSale = async (salesArr) => {
  const saleId = await salesModel.createSaleId(new Date());
  const allSaleProducts = salesArr
    .map(({ productId, quantity }) => salesModel.createSaleProduct(saleId, productId, quantity));
  await Promise.all(allSaleProducts);
  console.log(saleId, salesArr);
  return { id: saleId, itemsSold: salesArr };
};

module.exports = {
  getAll,
  getById,
  createSale,
};