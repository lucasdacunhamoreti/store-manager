const saleModel = require('../models/saleModel');
const productModel = require('../models/product.model');
const validate = require('./validations/validationData');
const verifyError = require('../middlewares/validateSale');

const registerSale = async (body) => {
  let error = await validate.validateSale(body);
  if (error) {
    error = error.details[0].message;
    return verifyError.verifyError(error);
  }
  const getProducts = await Promise.all(body
    .map(async (item) => productModel.getOneProduct(item.productId)));
  const verifyProducts = getProducts.some((item) => item === undefined);
  if (verifyProducts) return { code: 404, error: 'Product not found' };

  const result = await saleModel.registerSale(body);
  return { code: 201, message: result };
};

module.exports = { registerSale };
