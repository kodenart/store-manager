const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  // Since the response will be a simple resource and not a collection,
  // we'll be extracting the object inside the array which contains only one item.
  return result[0];
};

module.exports = {
  getAll,
  getById,
};