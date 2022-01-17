// ************ Require's ************
const express = require('express');
const usersRouter = express.Router();

// ************ Middlewares ************ 
const upload = require('../middlewares/usersMulter'); // MIDDLEWARE DE MULTER (SUBIR ARCHIVOS)
const validateRegisterMiddleware = require('../middlewares/validateRegisterMiddleware');  // MIDDLEWARE DE VALIDACIÓN DE REGISTRO
const guestMiddleware = require('../middlewares/guestMiddleware'); // MIDDLEWARE DE VERIFICACIÓN DE USUARIO LOGUEADO CON SESSION 
const authMiddleware = require('../middlewares/authMiddleware'); // MIDDLEWARE DE VERIFICACIÓN DE USUARIO NO LOGUEADO CON SESSION 

// ************ Controller Require ************
const usersController = require('../controllers/usersController');



/*** CUENTA ***/
usersRouter.get('/', guestMiddleware, usersController.account); // RENDERIZA LA VISTA DE REGISTER-LOGIN(ACCOUNT). SI EL USUARIO ESTÁ LOGUEADO EL MIDDLEWARE LO REDIRIGE AL PERFIL EN VEZ DE A LA PÁGINA DE REGISTRO
usersRouter.post('/login', usersController.login); // PROCESA EL FORMULARIO DE LOGIN
usersRouter.post('/register', upload.single('avatar'), validateRegisterMiddleware, usersController.register); // PROCESA EL FORMULARIO DE REGISTRO CON VALIDACIONES Y MULTER

usersRouter.get('/perfil', authMiddleware, usersController.profile);

usersRouter.get('/perfil/editar-perfil', usersController.editProfile);
usersRouter.put('/perfil/editar-perfil', upload.single('avatar'), usersController.editProfileProcess)

usersRouter.get('/logout', usersController.logout); // DESLOGUEA AL USUARIO


module.exports = usersRouter;