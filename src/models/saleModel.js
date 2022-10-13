const camelize = require('camelize');
const connection = require('./connection');

const registerSale = async (body) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()', [],
  );

  body.map(async (item) => {
    await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [result.insertId, item.productId, item.quantity],
    );
  });

  return {
    id: result.insertId,
    itemsSold: body,
  };
};

const getSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    ORDER BY sp.sale_id`,
  );

  return camelize(result);
};

const getOneSale = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE s.id = ?`, [id],
  );

  return camelize(result);
};

module.exports = {
  registerSale,
  getSales,
  getOneSale,
};
