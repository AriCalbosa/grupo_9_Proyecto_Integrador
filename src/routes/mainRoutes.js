// ************ Require's ************
const express = require('express');
const mainRouter = express.Router();



// ************ Controller Require ************
const mainController = require('../controllers/mainController');



/*** HOME ***/
mainRouter.get('/', mainController.home);



/*** BUSCADOR ***/
mainRouter.get('/productos-encontrados', mainController.search);



/*** CARRITO ***/
mainRouter.get('/carrito', mainController.carrito);



module.exports = mainRouter;