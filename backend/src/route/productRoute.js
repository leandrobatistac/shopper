const { Router } = require('express');
const productController = require('../controller/productController');

const productRoute = Router();

productRoute.get('/', productController.getAllProducts);

module.exports = productRoute;
