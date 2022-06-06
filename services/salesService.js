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

const createSaleProduct = async (saleId, salesArr) => {
  const allSaleProducts = salesArr
    .map(({ productId, quantity }) => salesModel.createSaleProduct(saleId, productId, quantity));
  const result = await Promise.all(allSaleProducts);
  return result;
};

const createSale = async (salesArr) => {
  const saleId = await salesModel.createSaleId(new Date());
  await createSaleProduct(saleId, salesArr);
  return { id: saleId, itemsSold: salesArr };
};

const deleteSales = async (saleId) => {
  await salesModel.deleteSales(saleId);
  return 0;
};

const updateSales = async (saleId, newSales) => {
  // checks if there's any sale with given id
  const noId = getById(saleId);
  if (noId.code && noId.message) return noId;
  // deletes all sales with given id
  await deleteSales(saleId);
  // add new ones.
  await createSaleProduct(saleId, newSales);
  return { saleId, itemUpdated: newSales };
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSales,
};