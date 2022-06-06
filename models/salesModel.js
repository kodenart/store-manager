const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT S_P.sale_id AS saleId, S.\`date\` AS \`date\`,
                S_P.\`product_id\` AS productId, S_P.\`quantity\` FROM sales AS S
                INNER JOIN sales_products AS S_P
                ON S.id = S_P.sale_id
                ORDER BY saleId, productId;`;
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  // if (!id) return { code: 'noId', message: 'No id was given' };
  const query = `SELECT S.\`date\` AS \`date\`,
  S_P.\`product_id\` AS productId, S_P.\`quantity\` FROM StoreManager.sales AS S
  INNER JOIN StoreManager.sales_products AS S_P
  ON S.id = S_P.sale_id
  WHERE S.id = ?
  ORDER BY productId;`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

const createSaleId = async (datetime) => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (?)';
  const [result] = await connection.execute(query, [datetime]);
  console.log(result.insertId);
  return result.insertId;
};

const createSaleProduct = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;
  const [result] = await connection.execute(query, [saleId, productId, quantity]);
  return result;
};

// delete sales from saleId
const deleteSales = async (saleId) => {
  const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  await connection.execute(query, [saleId]);
  return 0;
};

// const plusQuantity = async (productId, quantity) => {

// };

// const minusQuantity = async (productId, quantity) => {

// };

module.exports = {
  getAll,
  getById,
  createSaleId,
  createSaleProduct,
  deleteSales,
};
