const productValidation = require('./validationProduct');
const saleValidation = require('./validationSale');

const validateProduct = (body) => {
  const { error } = productValidation.productSchema.validate(body);
  return error;
};

const validateNameProduct = (body) => {
  const { error } = productValidation.validateNameSchema.validate(body);
  return error;
};

const validateSale = (body) => {
  for (let index = 0; index < body.length; index += 1) {
    const { error } = saleValidation.saleSchema.validate(body[index]);
    if (error) {
      return error;
    }
  }
};

module.exports = { validateProduct, validateSale, validateNameProduct };
