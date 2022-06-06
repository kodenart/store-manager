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

const add = async (name, quantity) => {
  const query = `INSERT INTO StoreManager.products (name, quantity)
  VALUES (?, ?)`;
  const [result] = await connection.execute(query, [name, quantity]);
  return result.insertId;
};

const update = async (id, name, quantity) => {
  const query = `UPDATE StoreManager.products
  SET name = ?, quantity = ?
  WHERE id = ?;`;
  const [result] = await connection.execute(query, [name, quantity, id]);
  return result.affectedRows;
};

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
  return 0;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
};
