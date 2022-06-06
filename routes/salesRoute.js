const express = require('express');
const saleController = require('../controllers/salesController');
const validateSales = require('../middlewares/validateSales');

const route = express.Router();

route.get('/', saleController.getAll);
route.get('/:id', saleController.getById);

route.post('/', validateSales, saleController.create);
route.put('/:id', validateSales, saleController.update);
route.delete('/:id', saleController.exclude);

module.exports = route;