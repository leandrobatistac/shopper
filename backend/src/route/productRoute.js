const { Router } = require('express');
const productController = require('../controller/productController');

const productRoute = Router();

productRoute.get('/', productController.getAllProducts);
productRoute.patch('/', productController.updateProduct);

module.exports = productRoute;
