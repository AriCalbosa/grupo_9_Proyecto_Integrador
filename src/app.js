const express = require ('express');
const path = require ('path');
const app = express ();

const publicPath = path.resolve(__dirname,'../public');
app.use(express.static(publicPath));

app.listen(5000, function(){
    console.log('El servidor corriendo en el puerto 5000');
});


const mainRoutes = require('./routes/mainRoutes');

const productRoutes = require('./routes/productRoutes');

const userRoutes = require('./routes/userRoutes');

// app.use(express.static('../public'));

app.set('view engine', 'ejs');

app.use('/', mainRoutes);

app.use('/', productRoutes);

app.use('/', userRoutes);