const fs = require('fs');
const path = require('path');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");

const rutaProductos = path.join(__dirname, '../database/products.json');
const productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));


const mainController = {
    home: (req, res) => {
        let productsCasual = db.Product.findAll({ raw:true, include: ['sizes'],
            where: {
                category: 'casual'
            }
        });
        let productsFutbol = db.Product.findAll({ raw:true, include: ['sizes'],
            where: {
                category: 'futbol'
            }
        });
        let productsRunning = db.Product.findAll({ raw:true, include: ['sizes'],
            where: {
                category: 'running'
            }
        });
        Promise.all([productsCasual, productsFutbol, productsRunning])
            .then(([productsCasual, productsFutbol, productsRunning]) => {
                let productsListCasual =productsCasual.map(product => {
                    let oneProduct = {
                        id: product.id,
                        product_name: product.product_name,
                        price: product.price,
                        discount: product.discount,
                        category: product.category,
                        size: product['sizes.id'],
                        color: product['sizes.Product_Size.color'],
                        image: product['sizes.Product_Size.image'],
                        quantity: product['sizes.Product_Size.stock']
                    }
                    return oneProduct;
                })
                let productsListFutbol =productsFutbol.map(product => {
                    let oneProduct = {
                        id: product.id,
                        product_name: product.product_name,
                        price: product.price,
                        discount: product.discount,
                        category: product.category,
                        size: product['sizes.id'],
                        color: product['sizes.Product_Size.color'],
                        image: product['sizes.Product_Size.image'],
                        quantity: product['sizes.Product_Size.stock']
                    }
                    return oneProduct;
                })
                let productsListRunning =productsRunning.map(product => {
                    let oneProduct = {
                        id: product.id,
                        product_name: product.product_name,
                        price: product.price,
                        discount: product.discount,
                        category: product.category,
                        size: product['sizes.id'],
                        color: product['sizes.Product_Size.color'],
                        image: product['sizes.Product_Size.image'],
                        quantity: product['sizes.Product_Size.stock']
                    }
                    return oneProduct;
                })
                res.render('../src/views/main/home', {productsCasual: productsListCasual, productsFutbol: productsListFutbol, productsRunning: productsListRunning});
            })
            .catch(error => {
                console.log(error)
                return res.render('../src/views/main/home', { 
                    error: error
                });
            })
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