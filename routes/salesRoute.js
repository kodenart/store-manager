const express = require('express');
const saleController = require('../controllers/salesController');

const route = express.Router();

route.get('/', saleController.getAll);
route.get('/:id', saleController.getById);

module.exports = route;