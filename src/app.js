// ************ Require's ************
const express = require ('express'); // MÓDULO DE EXPRESS
const path = require ('path');
const methodOverride = require('method-override');
const session = require('express-session'); // MÓDULO DE SESSION
const cookies = require('cookie-parser'); // MÓDULO DE COOKIES
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware'); // MIDDLEWARE GLOBAL DE VERIFICACIÓN DE LOGUEO CON COOKIES(PARA MOSTRAR O NO BOTONES DE REGISTER Y LOGIN)



// ************ express() ************
const app = express (); // EJECUCIÓN DE EXPRESS



// ************ Middlewares ************
app.use(session({secret:'secreto!!!', resave: false, saveUninitialized: false, })) // EJECUCIÓN DE SESSION
app.use(cookies()); // EJECUCIÓN DE COOKIES
app.use(express.urlencoded({ extended: false })); // CONFIGURA EL RESULTADO DE FORMULARIOS COMO OBJETO LITERAL
app.use(express.json()); // PERMITE CONVERTIR EL RESULTADO DE LOS FORMULARIOS EN FORMATOS JSON
app.use(express.static(path.resolve(__dirname,'../public'))); // CONFIGURA ACCESO A CARPETA DE RECURSOS ESTÁTICOS (VISTAS)
app.use(methodOverride('_method'));
app.use(userLoggedMiddleware); // EJECUCIÓN DE MIDDLEWARE DE LOGUEO A NIVEL GLOBAL (COOKIES)



// ************ Template Engine ************
app.set('view engine', 'ejs');



// ************ Rutas requeridas ************
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const usersRoutes = require('./routes/usersRoutes');

// ************ Rutas requeridas APIs ************
const productRoutesApi = require('./routes/api/productsRoutes');
const usersRoutesApi = require('./routes/api/usersRoutes');


// ************ use() ************
app.use('/', mainRoutes);
app.use('/productos', productRoutes);
app.use('/cuenta', usersRoutes);



// ************ use() APIs ************
app.use('/api/productos', productRoutesApi);
app.use('/api/usuarios', usersRoutesApi);



// ************ Servidor ************
app.listen(process.env.PORT || 5000, function(){
    console.log('El servidor corriendo en el puerto 5000');
});