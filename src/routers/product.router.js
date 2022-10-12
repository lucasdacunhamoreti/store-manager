const express = require('express');

const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getOneProduct);

router.post('/products', productController.registerProduct);

module.exports = router;
