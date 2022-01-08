// ************ Require's ************
const express = require ('express');
const path = require ('path');
const methodOverride = require('method-override');



// ************ express() ************
const app = express ();



// ************ Middlewares ************
app.use(express.static(path.resolve(__dirname,'../public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// ************ Template Engine ************
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas



// ************ Rutas requeridas y use() ************
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use('/', mainRoutes);
app.use('/productos', productRoutes);
app.use('/cuenta', usersRoutes);



// ************ Servidor ************
app.listen(process.env.PORT || 5000, function(){
    console.log('El servidor corriendo en el puerto 5000');
});