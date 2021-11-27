const express = require('express');
const mainRouter = express.Router();

const mainController = require('../controllers/mainController');

mainRouter.get('/', mainController.home);

// mainRouter.get('/cuenta', mainController.cuenta);

mainRouter.get('/carrito', mainController.carrito);

// mainRouter.get('/producto', mainController.producto);

// mainRouter.get('/productos', mainController.listaProductos);

// mainRouter.get('/crear-producto', mainController.crearProducto);

// mainRouter.get('/editar-producto', mainController.editarProducto);

module.exports = mainRouter;