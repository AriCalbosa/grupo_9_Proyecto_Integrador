// ************ Require's ************
const express = require('express');
const mainRouter = express.Router();



// ************ Controller Require ************
const mainController = require('../controllers/mainController');



// ************ Home ************
mainRouter.get('/', mainController.home);



// ************ Carrito ************
mainRouter.get('/carrito', mainController.carrito);



module.exports = mainRouter;