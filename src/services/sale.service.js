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
  console.log(body, 'BODYYY');
  const getProducts = await Promise.all(body
    .map(async (item) => productModel.getOneProduct(item.productId)));
  console.log(getProducts);
  const verifyProducts = getProducts.some((item) => item === undefined);
  // console.log(verifyProducts, 'verifyProducts');
  if (verifyProducts) return { code: 404, error: 'Product not found' };

  const result = await saleModel.registerSale(body);
  return { code: 201, message: result };
};

const getSales = async () => {
  const result = await saleModel.getSales();
  return { code: 200, message: result };
};

const getOneSale = async (id) => {
  const result = await saleModel.getOneSale(id);
  if (!result.length) return { code: 404, error: 'Sale not found' };
  return { code: 200, message: result };
};

module.exports = { registerSale, getSales, getOneSale };
