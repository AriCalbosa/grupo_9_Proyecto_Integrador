const path = require('path');

const mainController = {
    home: (req, res) => {
        res.render('../src/views/main/home');
    },
    cuenta: (req, res) => {
        res.render('../src/views/users/register-login');
    },
    carrito: (req, res) => {
        res.render('../src/views/main/productCart');
    },
    listaProductos: (req, res) => {
        res.render('../src/views/products/productList')
    },
    producto: (req, res) => {
        res.render('../src/views/products/productDetail');
    },
    crearProducto: (req,res) => {
        res.render('../src/views/products/productNew')
    },
    editarProducto: (req, res) => {
        res.render('../src/views/products/productEdit')
    }
};

module.exports = mainController;