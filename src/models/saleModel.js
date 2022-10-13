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

module.exports = {
  registerSale,
};
