// ************ Require's ************
const express = require('express');
const productRouter = express.Router();
const upload = require('../middlewares/productsMulter');





// ************ Controller Require ************
const productController = require('../controllers/productController');



/*** LISTADO DE PRODUCTOS ***/ 
productRouter.get('/', productController.productsList);
productRouter.get('/casual', productController.productosCasual);
productRouter.get('/futbol', productController.productosFutbol);
productRouter.get('/running', productController.productosRunning);



/*** CREAR UN PRODUCTO ***/ 
productRouter.get('/crear-producto', productController.createProduct);
productRouter.post('/', upload.single('image'), productController.storeProduct); 



/*** PRODUCTO ***/ 
productRouter.get('/:categoria/:id', productController.productDetail);



/*** EDITAR UN PRODUCTO ***/ 
productRouter.get('/:categoria/:id/editar-producto', productController.editProduct);
productRouter.put('/:categoria/:id', upload.any(), productController.updateProduct); 



/*** ELIMINAR UN PRODUCTO ***/ 
productRouter.delete('/:categoria/:id', productController.deleteProduct); 



module.exports = productRouter;