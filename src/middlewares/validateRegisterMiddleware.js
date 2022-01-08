// MIDDLEWARE DE VALIDACIÓN DEL FORMULARIO DE REGISTRO

const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('nombre').notEmpty().withMessage('Tenes que escribir un nombre'),
    body('apellido').notEmpty().withMessage('Tenes que escribir un apellido'),
    body('usuario').notEmpty().withMessage('Tenes que escribir un usuario'),
	body('email').notEmpty().withMessage('Tenes que escribir un correo electrónico').bail()
		         .isEmail().withMessage('Tenes que escribir un formato de correo válido'),
    body('domicilio').notEmpty().withMessage('Tenes que escribir un domicilio'),
	body('password').notEmpty().withMessage('Tenes que escribir una contraseña')
	                .isLength({min: 7}).withMessage('La contraseña debe tener al menos 7 caracteres'),
    body('password2').notEmpty().withMessage('Tenes que confirmar la contraseña'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]