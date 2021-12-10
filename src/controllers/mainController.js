const fs = require('fs');
const path = require('path');

const rutaProductos = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));


const mainController = {
    home: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
        res.render('../src/views/main/home', {productos: productos});
    },
    buscador: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
        let productosBuscado = req.query.search;
        let productosBuscadoMin = productosBuscado.toLowerCase();
        let productosEncontrados = [];

        for (let i = 0; i < productos.length; i++) {
            let producto = productos[i].nombre.toLowerCase();
            if (producto.includes(productosBuscadoMin)) {
                productosEncontrados.push(productos[i]);
            }
        }
        res.render('../src/views/main/productosEncontrados', {productos: productosEncontrados});
    },
    carrito: (req, res) => {
        res.render('../src/views/main/productCart');
    }
};

module.exports = mainController;