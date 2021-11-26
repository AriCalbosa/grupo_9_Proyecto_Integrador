const path = require('path');

const mainController = {
    home: (req, res) => {
        res.render('../src/views/home');
    },
    cuenta: (req, res) => {
        res.render('../src/views/users/register-login');
    },
    carrito: (req, res) => {
        res.render('../src/views/productCart');
    },
    producto: (req, res) => {
        res.render('../src/views/products/productDetail');
    },
    listaProductos: (req, res) => {
        res.render('../src/views/products/productList')
    },
    nuevoProducto: (req,res) => {
        res.render('../src/views/products/productNew')
    },
    editarProducto: (req, res) => {
        res.render('../src/views/products/productEdit')
    }
};

module.exports = mainController;