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
    search: (req, res) => {
        db.Product.findAll({raw:true, include: ['sizes']})
        .then(products => {
            let productsList =products.map(product => {
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
            let searchedProducts = req.query.search;
            let searchedProductsMin = searchedProducts.toLowerCase();
            let foundedProducts = [];
            for (let i = 0; i < productsList.length; i++) {
                let productMin = productsList[i].product_name.toLowerCase();
                if (productMin.includes(searchedProductsMin)) {
                    foundedProducts.push(productsList[i]);
                }
            }
            res.render('../src/views/main/searchProducts', {products: foundedProducts});
        })
        .catch(error => {
            console.log(error)
            return res.render('../src/views/main/home', { 
                error: error
            });
        })

        
    },
    carrito: (req, res) => {
        res.render('../src/views/main/productCart');
    }
};

module.exports = mainController;