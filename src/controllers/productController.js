const fs = require('fs');
const path = require('path');

const rutaProductos = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));


const productController = {
    listaProductos: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
        res.render('../src/views/products/productList', {productos: productos});
    },
    producto: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
        let id = req.params.id;
		let productoAMostrar = productos.find(element => element.id == id);
        res.render('../src/views/products/productDetail', {producto: productoAMostrar});
    },
    crearProducto: (req,res) => {
        res.render('../src/views/products/productNew')
    },
    editarProducto: (req, res) => {
        res.render('../src/views/products/productEdit')
    },
    eliminarProducto: (req, res) => {
        res.redirect('/productos')
    }
};

module.exports = productController;