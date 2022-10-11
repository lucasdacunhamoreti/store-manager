const productModel = require('../models/product.model');

const getProducts = async () => {
  const result = await productModel.getProducts();
  return { code: 200, message: result };
};

const getOneProduct = async (id) => {
  const result = await productModel.getOneProduct(id);
  if (!result) return { code: 404, error: 'Product not found' };
  return { code: 200, message: result };
};

module.exports = {
  getProducts,
  getOneProduct,
};
