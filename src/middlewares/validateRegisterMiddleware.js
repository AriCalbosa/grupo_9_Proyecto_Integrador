// MIDDLEWARE DE VALIDACIÓN DEL FORMULARIO DE REGISTRO

const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('apellido').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('usuario').notEmpty().withMessage('Tienes que escribir un usuario'),
	body('email').notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		         .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('domicilio').notEmpty().withMessage('Tienes que escribir un domicilio'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('password2').notEmpty().withMessage('Tienes que confirmar la contraseña'),
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