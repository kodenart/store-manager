const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result.length === 0) return { code: 'NOT_FOUND', message: 'Sale not found' };
  return result;
};

const validateQuantity = async ({ productId, quantity }) => {
  const product = await productsModel.getById(productId);
  const test = product.quantity - quantity;
  if (test < 0) {
    return { code: 'UNPROCESSABLE_ENTITY', message: 'Such amount is not permitted to sell' };
  }
  return 0;
}; 

const createSaleProduct = async (saleId, salesArr) => {
  const allProducts = salesArr.map((product) => validateQuantity(product));
  const validation = await Promise.all(allProducts);
  const error = validation.find((product) => product.code);
  if (error) return error;

  const updateQntArr = salesArr.map((product) => productsModel.updateQnt(product, 'minus'));
  await Promise.all(updateQntArr);

  const allSaleProducts = salesArr
    .map(({ productId, quantity }) => salesModel.createSaleProduct(saleId, productId, quantity));
  const result = await Promise.all(allSaleProducts);
  return result;
};

const createSale = async (salesArr) => {
  const saleId = await salesModel.createSaleId(new Date());
  const result = await createSaleProduct(saleId, salesArr);
  if (result.code && result.message) return result;
  return { id: saleId, itemsSold: salesArr };
};

const deleteSales = async (saleId) => {
  // checks if there's any sale with given id
  const salesArr = await getById(saleId);
  // if there's any error
  if (salesArr.code && salesArr.message) return salesArr;

  // update products quantity based on the array returned from the getById function
  const updateQntArr = salesArr.map((product) => productsModel.updateQnt(product, 'add'));
  await Promise.all(updateQntArr);

  await salesModel.deleteSales(saleId);
  return 0;
};

const excludeSale = async (saleId) => {
  // exclude the sale
  const result = await deleteSales(saleId);
  if (result.code && result.message) return result;
  await salesModel.excludeSale(saleId);
  return 0;
};

const updateSales = async (saleId, newSales) => {
  // checks if there's any sale with given id
  const salesArr = getById(saleId);
  if (salesArr.code && salesArr.message) return salesArr;

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
  excludeSale,
  validateQuantity,
};