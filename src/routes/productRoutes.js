const express = require('express');
const productRouter = express.Router();

const productController = require('../controllers/productController');

productRouter.get('/productos', productController.listaProductos);

productRouter.get('/producto', productController.producto);

productRouter.get('/crear-producto', productController.crearProducto);

productRouter.get('/editar-producto', productController.editarProducto);

module.exports = productRouter;