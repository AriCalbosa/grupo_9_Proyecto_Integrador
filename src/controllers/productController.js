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
    crearProducto: (req, res) => {
        res.render('../src/views/products/productNew')
    },
    guardarProductoNuevo: (req, res) => {
        let nuevoId = productos[productos.length-1].id + 1;

		let nuevoProducto = {
			id: nuevoId,
			...req.body,  
			imagen01: req.file == undefined ? "default.png": req.file.filename,
            imagen02: req.file == undefined ? "default.png": req.file.filename,
            imagen03: req.file == undefined ? "default.png": req.file.filename
		}
		
		productos.push(nuevoProducto);

		let productosJSON = JSON.stringify(productos, null, 2)  // el 2 hace que quede uno abajo del otro en la base de datos
		fs.writeFileSync(rutaProductos,productosJSON);

		res.redirect('/productos');
    },
    editarProducto: (req, res) => {
        res.render('../src/views/products/productEdit')
    },
    eliminarProducto: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
		let id = req.params.id;
		let productosNoBorrados = productos.filter((producto) => {
			return producto.id != id;
		});

		let productosJSON = JSON.stringify(productosNoBorrados, null, 2)  // el 2 hace que quede uno abajo del otro en la base de datos
		fs.writeFileSync(rutaProductos,productosJSON);
        res.redirect('/productos')
    }
};

module.exports = productController;