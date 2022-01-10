// MIDDLEWARE DE RUTA DE VERIFICACIÓN DE USUARIO NO LOGUEADO EN SESSION (PARA PROFILE)
function authMiddleware(req, res, next) {
	if (!req.session.userLogged) { // SI NO HAY UN USUARIO GUARDADO EN SESSION
		return res.redirect('/cuenta/login'); // REDIRIGE A LA VISTA DEL LOGIN PARA QUE NO ENTRE A NINGÚN PERFIL
	}
	next();
}

module.exports = authMiddleware;