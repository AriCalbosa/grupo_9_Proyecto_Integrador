// ************ Require's ************
const express = require('express');
const productRouter = express.Router();
const upload = require('../middlewares/multer');



// ************ Controller Require ************
const productController = require('../controllers/productController');



/*** LISTADO DE PRODUCTOS ***/ 
productRouter.get('/', productController.listaProductos);
productRouter.get('/casual', productController.productosCasual);
productRouter.get('/futbol', productController.productosFutbol);
productRouter.get('/running', productController.productosRunning);



/*** CREAR UN PRODUCTO ***/ 
productRouter.get('/crear-producto', productController.crearProducto);
productRouter.post('/', upload.single('imagen01'), productController.guardarProductoNuevo); 



/*** PRODUCTO ***/ 
productRouter.get('/:categoria/:id', productController.producto);



/*** EDITAR UN PRODUCTO ***/ 
productRouter.get('/:categoria/:id/editar-producto', productController.editarProducto);
productRouter.put('/:categoria/:id', upload.single('imagen01'), productController.actualizarProducto); 



/*** ELIMINAR UN PRODUCTO ***/ 
productRouter.delete('/:categoria/:id', productController.eliminarProducto); 



module.exports = productRouter;