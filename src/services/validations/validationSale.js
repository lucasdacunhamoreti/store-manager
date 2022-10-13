const Joi = require('joi');

const saleSchema = Joi.object({
  productId: Joi.number().min(1).required().messages({
    'any.required': '"productId" is required',
    'string.empty': '"productId" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
});

module.exports = { saleSchema };
