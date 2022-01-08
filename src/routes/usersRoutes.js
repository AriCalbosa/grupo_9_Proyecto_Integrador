// ************ Require's ************
const express = require('express');
const usersRouter = express.Router();



// ************ Controller Require ************
const usersController = require('../controllers/usersController');



/*** CUENTA ***/
usersRouter.get('/', usersController.account);
usersRouter.post('/perfil', usersController.register);
usersRouter.post('/perfil', usersController.login)



/*** PERFIL ***/
usersRouter.get('/perfil', usersController.profile);



module.exports = usersRouter;