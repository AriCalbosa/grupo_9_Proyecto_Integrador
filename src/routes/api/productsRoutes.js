const express = require('express');
const productRouter = express.Router();
const productControllerApi = require('../../controllers/api/productController');

//Rutas
//Listado de todos los productos
productRouter.get('/', productControllerApi.productsList);
productRouter.get('/casual', productControllerApi.productsCasual);
productRouter.get('/futbol', productControllerApi.productsFutbol);
productRouter.get('/running', productControllerApi.productsRunning);

/*** Producto ***/ 
productRouter.get('/:categoria/:id', productControllerApi.productDetail);

// //Detalle del actor
// router.get('/:id', actorsAPIController.detail);
// //En que peliculas trabajo el actor con id tal
// router.get('/:id/movies', actorsAPIController.actorMovies);

// //Agregar un actor
// router.post('/create', actorsAPIController.create);
// //Modificar un actor
// router.put('/update/:id', actorsAPIController.update);
// //Eliminar un actor
// router.delete('/delete/:id', actorsAPIController.destroy);

module.exports = productRouter;