const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.home);

router.get('/cuenta', mainController.cuenta);

router.get('/carrito', mainController.carrito);

router.get('/producto', mainController.producto);

router.get('/productos', mainController.listaProductos);

router.get('/producto-nuevo', mainController.nuevoProducto);

router.get('/editar-producto', mainController.editarProducto);

module.exports = router;