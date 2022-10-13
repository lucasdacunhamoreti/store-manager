const productService = require('../services/product.service');

const getProducts = async (_req, res) => {
  const { code, message } = await productService.getProducts();
  return res.status(code).json(message);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const { code, message, error } = await productService.getOneProduct(id);
  if (error) return res.status(code).json({ message: error });
  res.status(code).json(message);
};

const registerProduct = async (req, res) => {
  const { code, message, error } = await productService.registerProduct(req.body);
  if (error) return res.status(code).json({ message: error });
  res.status(code).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { code, message, error } = await productService.updateProduct(name, id);
  if (error) return res.status(code).json({ message: error });
  res.status(code).json(message);
};

module.exports = { getProducts, getOneProduct, registerProduct, updateProduct };
