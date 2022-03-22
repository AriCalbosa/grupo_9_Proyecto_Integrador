const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator'); // REQUIERE EL MÓDULO EXPRESS-VALIDATOR

const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");



const productController = {
    productsList: (req, res) => {
        db.Product.findAll({raw:true, include: ['sizes']})
        .then(products => {
            let productsList =products.map(product => {
                let oneProduct = {
                    id: product.id,
                    product_name: product.product_name,
                    price: product.price,
                    discount: product.discount,
                    category: product.category,
                    size: product['sizes.number'],
                    color: product['sizes.Product_Size.color'],
                    image: product['sizes.Product_Size.image'],
                    quantity: product['sizes.Product_Size.stock']
                }
                return oneProduct;
            })
            let response = {
                meta: {
                    status : 200,
                    total: productsList.length,
                    url: 'http://localhost:5000/api/productos'
                },
                data: productsList
            }
                res.json(response);
            })

    },
    productsCasual: (req, res) => {
        db.Product.findAll({raw:true, include: ['sizes'],
            where: {
                category: 'casual'
            }
        })
        .then(products => {
            let productsList =products.map(product => {
                let oneProduct = {
                    id: product.id,
                    product_name: product.product_name,
                    price: product.price,
                    discount: product.discount,
                    category: product.category,
                    size: product['sizes.number'],
                    color: product['sizes.Product_Size.color'],
                    image: product['sizes.Product_Size.image'],
                    quantity: product['sizes.Product_Size.stock']
                }
                return oneProduct;
            })
            let response = {
                meta: {
                    status : 200,
                    total: productsList.length,
                    url: 'http://localhost:5000/api/productos/casual'
                },
                data: productsList
            }
                res.json(response);
        })

    },
    productsFutbol: (req, res) => {
        db.Product.findAll({raw:true, include: ['sizes'],
            where: {
                category: 'futbol'
            }
        })
        .then(products => {
            let productsList =products.map(product => {
                let oneProduct = {
                    id: product.id,
                    product_name: product.product_name,
                    price: product.price,
                    discount: product.discount,
                    category: product.category,
                    size: product['sizes.number'],
                    color: product['sizes.Product_Size.color'],
                    image: product['sizes.Product_Size.image'],
                    quantity: product['sizes.Product_Size.stock']
                }
                return oneProduct;
            })
            let response = {
                meta: {
                    status : 200,
                    total: productsList.length,
                    url: 'http://localhost:5000/api/productos/futbol'
                },
                data: productsList
            }
                res.json(response);
        })
    },
    productsRunning: (req, res) => {
        db.Product.findAll({raw:true, include: ['sizes'],
            where: {
                category: 'running'
            }
        })
        .then(products => {
            let productsList =products.map(product => {
                let oneProduct = {
                    id: product.id,
                    product_name: product.product_name,
                    price: product.price,
                    discount: product.discount,
                    category: product.category,
                    size: product['sizes.number'],
                    color: product['sizes.Product_Size.color'],
                    image: product['sizes.Product_Size.image'],
                    quantity: product['sizes.Product_Size.stock']
                }
                return oneProduct;
            })
            let response = {
                meta: {
                    status : 200,
                    total: productsList.length,
                    url: 'http://localhost:5000/api/productos/running'
                },
                data: productsList
            }
                res.json(response);
        })
    },
    productDetail: (req, res) => {
        db.Product.findByPk(req.params.id, {raw:true, include: ['sizes']})
        .then(product => {
            product = {
                id: product.id,
                 product_name: product.product_name,
                 price: product.price,
                 discount: product.discount,
                 category: product.category,
                 size: product['sizes.number'],
                 color: product['sizes.Product_Size.color'],
                 image: product['sizes.Product_Size.image'],
                 quantity: product['sizes.Product_Size.stock']
            }
            let response = {
                meta: {
                    status : 200,
                    total: 1,
                    url: 'http://localhost:5000/api/productos/'+ product.category +'/'+product.id
                },
                data: product
            }
                res.json(response);
        })

    }
};

module.exports = productController;