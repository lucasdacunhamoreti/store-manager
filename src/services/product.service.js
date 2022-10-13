const productModel = require('../models/product.model');
const validate = require('./validations/validationData');

const getProducts = async () => {
  const result = await productModel.getProducts();
  return { code: 200, message: result };
};

const getOneProduct = async (id) => {
  const result = await productModel.getOneProduct(id);
  if (!result) return { code: 404, error: 'Product not found' };
  return { code: 200, message: result };
};

const registerProduct = async (body) => {
  const error = await validate.validateProduct(body);
  if (error) {
    const errorMessage = error.details[0].message;
    if (errorMessage === '"name" is required') return { code: 400, error: errorMessage };
    if (errorMessage === '"name" length must be at least 5 characters long') {
      return { code: 422, error: errorMessage };
    }
  }
  const result = await productModel.registerProduct(body.name);
  const getProduct = await productModel.getOneProduct(result);
  return { code: 201, message: getProduct };
};

const updateProduct = async (name, id) => {
const error = await validate.validateNameProduct(name);
  if (error) {
    const errorMessage = error.details[0].message;
    if (errorMessage === '"name" is required') return { code: 400, error: errorMessage };
    return { code: 422, error: errorMessage };
  }
  const productExist = await productModel.getOneProduct(id);
  if (!productExist) return { code: 404, error: 'Product not found' };
  const result = await productModel.updateProduct(name, id);
  return { code: 200, message: result };
};

const deleteProduct = async (id) => {
  const productExist = await productModel.getOneProduct(id);
  if (!productExist) return { code: 404, error: 'Product not found' };
  await productModel.deleteProduct(id);
  return { code: 204, message: '' };
};

module.exports = {
  getProducts,
  getOneProduct,
  registerProduct,
  updateProduct,
  deleteProduct,
};
