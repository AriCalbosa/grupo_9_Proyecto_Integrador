// MIDDLEWARE DE VALIDACIÓN DEL FORMULARIO DE REGISTRO

const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('product_name').notEmpty().withMessage('Tenes que escribir un nombre').bail()
                        .isLength({min: 6}).withMessage('El nombre del producto debe tener al menos 6 caracteres'),
    body('price').notEmpty().withMessage('Tenes que escribir un precio').bail()
                 .isInt().withMessage('Debes introducir un número'),
    body('discount').notEmpty().withMessage('Tenes que escribir un descuento').bail()
                 .isInt().withMessage('Debes introducir un número'),
	body('category').notEmpty().withMessage('Tenes que seleccionar una categoría'),
    body('color').notEmpty().withMessage('Tenes que seleccionar un color'),
    body('size').notEmpty().withMessage('Tenes que seleccionar un talle'),
    body('quantity').notEmpty().withMessage('Tenes que seleccionar una cantidad')

]