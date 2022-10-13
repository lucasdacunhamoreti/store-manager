const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getOneProduct = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return result;
};

const registerProduct = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );
  return result.insertId;
};

const updateProduct = async (name, id) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
  );

  return { id, name };
};

module.exports = {
  getProducts,
  getOneProduct,
  registerProduct,
  updateProduct,
};
