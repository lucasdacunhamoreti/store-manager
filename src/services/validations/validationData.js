const productValidation = require('./validationProduct');

const validateProduct = (body) => {
  const { error } = productValidation.productSchema.validate(body);
  return error;
};

module.exports = { validateProduct };
