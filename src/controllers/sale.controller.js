const saleService = require('../services/sale.service');

const registerSale = async (req, res) => {
  const { code, message, error } = await saleService.registerSale(req.body);
  if (error) return res.status(code).json({ message: error });
  res.status(code).json(message);
};

const getSales = async (_req, res) => {
  const { code, message } = await saleService.getSales();
  res.status(code).json(message);
};

const getOneSale = async (req, res) => {
  const { id } = req.params;
  const { code, message, error } = await saleService.getOneSale(id);
  if (error) return res.status(code).json({ message: error });
  res.status(code).json(message);
};

module.exports = { registerSale, getSales, getOneSale };
