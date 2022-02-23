const fs = require('fs');
const path = require('path');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");

const rutaProductos = path.join(__dirname, '../database/products.json');
const productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));


const mainController = {
    home: (req, res) => {
        let productsCasual = db.Product.findAll({
            where: {
                category: 'casual'
            }
        });
        let productsFutbol = db.Product.findAll({
            where: {
                category: 'futbol'
            }
        });
        let productsRunning = db.Product.findAll({
            where: {
                category: 'running'
            }
        });
        Promise.all([productsCasual, productsFutbol, productsRunning])
            .then(([productsCasual, productsFutbol, productsRunning]) => {
                console.log(productsCasual[0].category)
                res.render('../src/views/main/home', {productsCasual: productsCasual, productsFutbol: productsFutbol, productsRunning: productsRunning});
            })
            .catch(error => {
                console.log(error)
                return res.render('../src/views/main/home', { 
                    error: error
                });
            })


        // let productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
        // let productosCasual = productos.filter ((producto) => {
        //     return producto.categoria == "casual";
        // });
        // let productosFutbol = productos.filter ((producto) => {
        //     return producto.categoria == "futbol";
        // });
        // let productosRunning = productos.filter ((producto) => {
        //     return producto.categoria == "running";
        // });
        // res.render('../src/views/main/home', {productos: productos, productosCasual: productosCasual, productosFutbol: productosFutbol, productosRunning: productosRunning});
    },
    buscador: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
        let productosBuscado = req.query.search;
        let productosBuscadoMin = productosBuscado.toLowerCase();
        let productosEncontrados = [];

        for (let i = 0; i < productos.length; i++) {
            let productoMin = productos[i].nombre.toLowerCase();
            if (productoMin.includes(productosBuscadoMin)) {
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