const express = require ('express');
const path = require ('path');
const app = express ();

const publicPath = path.resolve(__dirname,'../public');
app.use(express.static(publicPath));

app.listen(5000, function(){
    console.log('El servidor corriendo en el puerto 5000');
});


const mainRoutes = require('./routes/mainRoutes');

// app.use(express.static('../public'));

app.set('view engine', 'ejs');

app.use('/', mainRoutes);

// app.get('/', function (req,res){
//     res.sendFile(path.resolve(__dirname,'./views/home.ejs'));
// });

// app.get('/carrito', function (req,res){
//     res.sendFile(path.resolve(__dirname,'./views/productCart.ejs'));
// });

// app.get('/producto', function (req,res){
//     res.sendFile(path.resolve(__dirname,'./views/productDetail.ejs'));
// });

// app.get('/cuenta', function (req,res){
//     res.sendFile(path.resolve(__dirname,'./views/register-login.ejs'));
// });