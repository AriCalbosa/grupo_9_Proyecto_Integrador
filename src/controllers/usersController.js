const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs'); // REQUIERE EL MÓDULO PARA ENCRIPTAR
const { validationResult } = require('express-validator'); // REQUIERE EL MÓDULO EXPRESS-VALIDATOR

const User = require('../models/User');  // REQUIERE LAS FUNCIONES EXPORTADAS DE MODELS USER.JS

const usersRoute = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersRoute, 'utf-8'));

const usersController = {
    account: (req, res) => {
        res.render('../src/views/users/account');
    },
    register: (req, res) => {  // FUNCIÓN QUE PROCESA LA INFORMACIÓN DEL FORMULARIO DE REGISTRO
        const resultValidation = validationResult(req); // GUARDA LOS ERRORES DE VALIDACIÓN EN UNA VARIABLE

        if (resultValidation.errors.length > 0) {  // SI HAY UN ERROR DE VALIDACIÓN RENDERIZA EL FORMULARIO DE REGISTRO CON LOS ERRORES Y LOS CAMPOS AUTOCOMPLETADOS
			return res.render('../src/views/users/account', {
				errors: resultValidation.mapped(), // ENVÍA ERRORES DE VALIDACIÓN A LA VISTA COMO OBJETOS
				oldData: req.body // ENVÍA A LA VISTA LA INFORMACIÓN PREVIAMENTE COMPLETADA
			});
		}


        let userInDBByUser = User.findByField('usuario', req.body.usuario); // BUSCA EL MAIL INGRESADO POR EL USUARIO EN LA BASE DE DATOS

		if (userInDBByUser) {
			return res.render('../src/views/users/account', { // SI ENCUENTRA EL MAIL RENDERIZA EL FORMULARIO DE REGISTRO INDICANDO QUE EL MAIL YA ESTÁ REGISTRADO Y LOS CAMPOS AUTOCOMPLETADOS
				errors: {
					usuario: {
						msg: 'Este usuario ya está registrado'
					}
				},
				oldData: req.body
			});
		}


		let userInDBByEmail = User.findByField('email', req.body.email); // BUSCA EL MAIL INGRESADO POR EL USUARIO EN LA BASE DE DATOS

		if (userInDBByEmail) {
			return res.render('../src/views/users/account', { // SI ENCUENTRA EL MAIL RENDERIZA EL FORMULARIO DE REGISTRO INDICANDO QUE EL MAIL YA ESTÁ REGISTRADO Y LOS CAMPOS AUTOCOMPLETADOS
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}


        if (req.body.password !== req.body.password2) {
            return res.render('../src/views/users/account', { // SI LAS CONTRASEÑAS INGRESADAS NO COINCIDEN RENDERIZA EL FORMULARIO DE REGISTRO INDICANDO QUE AMBAS CONTRASEÑAS DEBEN SER IGUALES
				errors: {
					password2: {
						msg: 'Las contraseñas deben ser iguales'
					}
				},
				oldData: req.body
			});
        }

        let userToCreate = { // SI NO HAY NINGÚN ERROR GUARDA TODOS LOS DATOS DEL FORMULARIO LLENADO POR EL CLIENTE Y ENCRIPTA CONTRASEÑA
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            email: req.body.email,
            domicilio: req.body.domicilio,
            password: bcryptjs.hashSync(req.body.password, 10), // CONTRASEÑA ENCRIPTADA
            avatar: req.file.filename // NOMBRE DEL ARCHIVO DE IMAGEN GUARDADO POR MULTER
        }

        let userCreated = User.create(userToCreate); // CREA UN USUARIO NUEVO EN LA BASE DE DATOS CON LA INFORMACIÓN LLENADA POR EL CLIENTE

        return res.render('../src/views/users/account', {  // REDIRIGE A LA PÁGINA DE LOGIN
            user: {
                nombre: req.body.nombre
            }
        });
    },
    login: (req, res) => {
        res.render('../src/views/users/login');
    },
    loginProcess: (req, res) => {    // FUNCIÓN QUE PROCESA LA INFORMACIÓN DEL FORMULARIO DE LOGIN
        let userToLogin = User.findByField('email', req.body.email1); // BUSCA EL USUARIO QUE COINCIDA CON EL MAIL QUE SE INGRESÓ EN EL FORMULARIO LOGIN EN LA BASE DE DATOS
		
		if(userToLogin) { // SI ENCUENTRA EL USUARIO CON EL MAIL INGRESADO EN EL FORMULARIO EN LA BASE DE DATOS
			let isOkThePassword = bcryptjs.compareSync(req.body.password1, userToLogin.password); // COMPARA CONTRASEÑA INGRESADA POR EL CLIENTE Y LA DE LA BASE DE DATOS ENCRIPTADA
			if (isOkThePassword) { // SI LAS CONTRASEÑAS SON IGUALES
				delete userToLogin.password; // BORRA LA CONTRASEÑA DEL USUARIO A LOGUEARSE POR SEGURIDAD
				req.session.userLogged = userToLogin; // GUARDA INFORMACIÓN DEL USUARIO LOGUEADO EN EL SESSION (SIN LA CONTRASEÑA)

				if(req.body.remember_user) { // SI SE TILDA LA OPCIÓN DE RECORDAR USUARIO EN EL FORMULARIO DE LOGIN
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 }) // GUARDA UNA COOKIE CON EL EMAIL DEL USUARIO POR UNA HORA
				}

				return res.redirect('/cuenta/perfil'); // SI TODO EL LOGUEO ESTÁ BIEN REDIRIGE AL PERFIL DEL CLIENTE
			} 
			return res.render('../src/views/users/login', { // SI ENCUENTRA EL MAIL PERO LAS CONTRASEÑAS NO COINCIDEN RENDERIZA LA VISTA DE LOGIN CON EL ERROR
				errors: {
					// email: {
					// 	msg: 'Las credenciales son inválidas'
					// },
                    password1: {
                        msg: 'La contraseña es inválida'
                    }
				},
                    oldData: req.body
			});
		}

		return res.render('../src/views/users/login', { // SI NO ENCUENTRA EL MAIL INGRESADO EN EL FORMULARIO DE LOGIN EN LA BASE DE DATOS RENDERIZA EL FORMULARIO DE LOGIN CON EL ERROR
			errors: {
				email1: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			},
            oldData: req.body
		});
    },
    profile: (req, res) => {
		let user = req.session.userLogged
        res.render('../src/views/users/profile', {
			user: user // INFORMACIÓN GUARDADA EN SESSION DEL USUARIO ENCONTRADO EN LA BASE DE DATOS
		})
    },
	editProfile: (req, res) => {
		let user = req.session.userLogged
		res.render('../src/views/users/editProfile', {
			user: user // INFORMACIÓN GUARDADA EN SESSION DEL USUARIO ENCONTRADO EN LA BASE DE DATOS
		});
	},
	editProfileProcess: (req, res) => {
		let userToEdit = User.findByField('email', req.session.userLogged.email);
		console.log(userToEdit)
		return res.redirect('/cuenta/perfil');
	},
	logout: (req, res) => {       // FUNCIÓN QUE DESLOGUEA AL USUARIO BORRANDO LAS COOKIES Y EL SESSION
		res.clearCookie('userEmail'); // BORRA LAS COOKIES PARA QUE NO SE LOGUEE AUTOMÁTICAMENTE CUANDO EL USUARIO CIERRA SESIÓN
		req.session.destroy();  // BORRA TODA LA INFORMACIÓN GUARDADA EN SESSION
		return res.redirect('/'); // REDIRIGE AL HOME
	}
};

module.exports = usersController;