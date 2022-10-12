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

  const [[data]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [result.insertId],
  );

  return data;
};

module.exports = {
  getProducts,
  getOneProduct,
  registerProduct,
};
