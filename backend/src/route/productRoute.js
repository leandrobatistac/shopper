const { Router } = require('express');
const productController = require('../controller/productController');

const teamsRoute = Router();

teamsRoute.get('/', productController.getAllProducts);

module.exports = teamsRoute;
