// ************ Require's ************
const express = require('express');
const userRouter = express.Router();



// ************ Controller Require ************
const userController = require('../controllers/userController');



/*** CUENTA ***/
userRouter.get('/', userController.cuenta);
userRouter.post('/perfil', userController.ingresar);
userRouter.post('/perfil', userController.crear)



/*** PERFIL ***/
userRouter.get('/perfil', userController.perfil);



module.exports = userRouter;