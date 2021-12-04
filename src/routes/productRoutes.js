// ************ Require's ************
const express = require('express');
const productRouter = express.Router();
const upload = require('../middlewares/multer');


// ************ Controller Require ************
const productController = require('../controllers/productController');


/*** LISTADO DE PRODUCTOS ***/ 
productRouter.get('/', productController.listaProductos);


/*** CREAR UN PRODUCTO ***/ 
productRouter.get('/crear-producto', productController.crearProducto);


/*** PRODUCTO ***/ 
productRouter.get('/:id', productController.producto);


/*** EDITAR UN PRODUCTO ***/ 
productRouter.get('/id:/editar-producto', productController.editarProducto);


/*** ELIMINAR UN PRODUCTO ***/ 
productRouter.delete('/:id', productController.eliminarProducto); 


module.exports = productRouter;