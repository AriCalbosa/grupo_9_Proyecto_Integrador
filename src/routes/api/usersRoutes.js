const express = require('express');
const userRouter = express.Router();
const usersControllerApi = require('../../controllers/api/usersController');

//Rutas
//Listado de todos los usuarios
userRouter.get('/', usersControllerApi.usersList);
userRouter.get('/:id', usersControllerApi.userDetail);

module.exports = userRouter;