const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator'); // REQUIERE EL MÓDULO EXPRESS-VALIDATOR

const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");



const productController = {
    productsList: (req, res) => {
        db.Product.findAll()
        .then(products => {
            let response = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'http://localhost:5000/api/productos'
                },
                data: products
            }
                res.json(response);
            })

    },
    productsCasual: (req, res) => {
        db.Product.findAll({
            where: {
                category: 'casual'
            }
        })
        .then(products => {
            let response = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'http://localhost:5000/api/productos/casual'
                },
                data: products
            }
                res.json(response);
        })

    },
    productsFutbol: (req, res) => {
        db.Product.findAll({
            where: {
                category: 'futbol'
            }
        })
        .then(products => {
            let response = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'http://localhost:5000/api/productos/futbol'
                },
                data: products
            }
                res.json(response);
        })
    },
    productsRunning: (req, res) => {
        db.Product.findAll({
            where: {
                category: 'running'
            }
        })
        .then(products => {
            let response = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'http://localhost:5000/api/productos/running'
                },
                data: products
            }
                res.json(response);
        })
    },
    productDetail: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then(product => {
           
            let response = {
                meta: {
                    status : 200,
                    total: 1,
                    url: 'http://localhost:5000/api/productos/:categoria/:id'
                },
                data: product
            }
                res.json(response);
        })

    }
};

module.exports = productController;