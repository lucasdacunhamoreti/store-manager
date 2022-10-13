const express = require('express');

const saleController = require('../controllers/sale.controller');

const routerSale = express.Router();

routerSale.post('/sales', saleController.registerSale);

module.exports = routerSale;
