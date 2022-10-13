const express = require('express');

const saleController = require('../controllers/sale.controller');

const routerSale = express.Router();

routerSale.post('/sales', saleController.registerSale);

routerSale.get('/sales', saleController.getSales);

routerSale.get('/sales/:id', saleController.getOneSale);

module.exports = routerSale;
