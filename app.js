const express = require ('express');
const path = require ('path');
const app = express ();

const publicPath = path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

app.listen(5000, function(){
    console.log('El servidor corriendo en el puerto 5000');
});

app.get('/', function (req,res){
    res.sendFile(path.resolve(__dirname,'./views/home.html'));
});

app.get('/carrito', function (req,res){
    res.sendFile(path.resolve(__dirname,'./views/productCart.html'));
});

app.get('/producto', function (req,res){
    res.sendFile(path.resolve(__dirname,'./views/productDetail.html'));
});

app.get('/cuenta', function (req,res){
    res.sendFile(path.resolve(__dirname,'./views/register-login.html'));
});