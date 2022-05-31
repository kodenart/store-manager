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
  const query = `SELECT S_P.sale_id AS saleId, S.\`date\` AS \`date\`,
                S_P.\`product_id\` AS productId, S_P.\`quantity\` FROM sales AS S
                INNER JOIN sales_products AS S_P
                ON S.id = S_P.sale_id
                WHERE S.id = ?
                ORDER BY saleId, productId;`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
};
