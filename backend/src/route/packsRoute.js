const { Router } = require('express');
const packsController = require('../controller/packsController');

const packsRoute = Router();

packsRoute.get('/', packsController.getAllPacks);

module.exports = packsRoute;
