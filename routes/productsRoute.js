const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const validateProducts = require('../middlewares/validateProducts');

const route = express.Router();

route.get('/', rescue(productsController.getAll));
route.get('/:id', rescue(productsController.getById));

route.post('/', validateProducts, rescue(productsController.add));
route.put('/:id', validateProducts, rescue(productsController.update));
route.delete('/:id', rescue(productsController.exclude));

module.exports = route;