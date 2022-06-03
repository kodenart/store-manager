const express = require('express');
const productsController = require('../controllers/productsController');
const validateProducts = require('../middlewares/validateProducts');

const route = express.Router();

route.get('/', productsController.getAll);
route.get('/:id', productsController.getById);

route.post('/', validateProducts);
route.put('/:id', validateProducts);

module.exports = route;