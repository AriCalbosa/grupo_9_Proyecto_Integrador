// MIDDLEWARE GLOBAL DE VERIFICACIÓN DE LOGUEO POR COOKIES
const User = require('../models/User');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false; // NO HAY USUARIO GUARDADO EN EL SESSION, POR LO QUE CARGA BOTONES DE REGISTRO Y LOGIN EN VISTA

	let emailInCookie = req.cookies.userEmail;  //PIDE EL EMAIL GUARDADO EN LA COOKIE
	let userFromCookie = User.findByField('email', emailInCookie); // BUSCA EL USUARIO POR EL MAIL TRAIDO POR LA COOKIE EN LA BASE DE DATOS

	if (userFromCookie) { // SI ENCUENTRA UN USUARIO CON EL MAIL BUSCADO
		req.session.userLogged = userFromCookie; // LOGUEA EN SESSION AL USUARIO ENCONTRADO
	}

	if (req.session.userLogged) { // SI HAY UN USUARIO LOGUEADO POR SESSION
		res.locals.isLogged = true; // HAY USUARIO LOGUEADO POR LO QUE CARGA BOTÓN DE PROFILE EN VISTA
		res.locals.userLogged = req.session.userLogged; // PASA LO QUE HAY EN SESSION A UNA VARIABLE LOCAL PARA USAR EN LA VISTA
	}

	next();
}

module.exports = userLoggedMiddleware;