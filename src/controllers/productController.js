const path = require('path');

const productController = {
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

module.exports = productController;