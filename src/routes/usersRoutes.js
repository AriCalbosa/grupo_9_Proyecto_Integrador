// ************ Require's ************
const express = require('express');
const usersRouter = express.Router();

// ************ Middlewares ************ 
const upload = require('../middlewares/usersMulter'); // MIDDLEWARE DE MULTER (SUBIR ARCHIVOS)
const validateRegisterMiddleware = require('../middlewares/validateRegisterMiddleware'); 

// ************ Controller Require ************
const usersController = require('../controllers/usersController');



/*** CUENTA ***/
usersRouter.get('/', usersController.account); // RENDERIZA LA VISTA DE REGISTER-LOGIN(ACCOUNT)
usersRouter.post('/', upload.single('avatar'), validateRegisterMiddleware, usersController.register); // PROCESA EL FORMULARIO DE REGISTRO CON VALIDACIONES Y MULTER
usersRouter.post('/', usersController.login) // PROCESAR EL FORMULARIO DE LOGIN



/*** PERFIL ***/
usersRouter.get('/perfil', usersController.profile);



module.exports = usersRouter;