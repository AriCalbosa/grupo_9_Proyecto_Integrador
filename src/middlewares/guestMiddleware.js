// MIDDLEWARE DE RUTA DE VERIFICACIÓN DE USUARIO LOGUEADO EN SESSION (PARA REGISTER Y LOGIN)
function guestMiddleware(req, res, next) {
	if (req.session.userLogged) { // SI HAY UN USUARIO GUARDADO EN SESSION
		return res.redirect('/cuenta/perfil'); // REDIRIGE AL PERFIL DEL USUARIO EN VEZ DE AL FORMULARIO DE REGISTRO O LOGIN
	}
	next();
}

module.exports = guestMiddleware;