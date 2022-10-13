const saleService = require('../services/sale.service');

const registerSale = async (req, res) => {
  const { code, message, error } = await saleService.registerSale(req.body);
  if (error) return res.status(code).json({ message: error });
  res.status(code).json(message);
};

module.exports = { registerSale };
