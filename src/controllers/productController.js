const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator'); // REQUIERE EL MÓDULO EXPRESS-VALIDATOR

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");




const productController = {
    productsList: (req, res) => {
        db.Product.findAll({ raw:true, include: ['sizes']  })
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
            res.render('../src/views/products/productList', {products: productsList});
        })
        .catch(error => {
			console.log(error)
			return res.render('../src/views/main/home', { 
				error: error
			});
		})

    },
    productosCasual: (req, res) => {
        db.Product.findAll({ raw:true, include: ['sizes'],
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
                    size: product['sizes.id'],
                    color: product['sizes.Product_Size.color'],
                    image: product['sizes.Product_Size.image'],
                    quantity: product['sizes.Product_Size.stock']
                }
                return oneProduct;
            })
            res.render('../src/views/products/productsCasual', {products: productsList});
        })
        .catch(error => {
			console.log(error)
			return res.render('../src/views/main/home', { 
				error: error
			});
		})
    },
    productosFutbol: (req, res) => {
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
                    size: product['sizes.id'],
                    color: product['sizes.Product_Size.color'],
                    image: product['sizes.Product_Size.image'],
                    quantity: product['sizes.Product_Size.stock']
                }
                return oneProduct;
            })
            res.render('../src/views/products/productsFutbol', {products: productsList});
        })
        .catch(error => {
			console.log(error)
			return res.render('../src/views/main/home', { 
				error: error
			});
		})
    },
    productosRunning: (req, res) => {
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
                    size: product['sizes.id'],
                    color: product['sizes.Product_Size.color'],
                    image: product['sizes.Product_Size.image'],
                    quantity: product['sizes.Product_Size.stock']
                }
                return oneProduct;
            })
            res.render('../src/views/products/productsRunning', {products: productsList});
        })
        .catch(error => {
			console.log(error)
			return res.render('../src/views/main/home', { 
				error: error
			});
		})
    },
    productDetail: (req, res) => {
        db.Product.findByPk(req.params.id,{ raw:true, include: ['sizes']})
        .then(product => {
           
            product = {
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
            res.render('../src/views/products/productDetail', {product: product});
        })
        .catch(error => {
			console.log(error)
			return res.render('../src/views/main/home', { 
				error: error
			});
		})
    },
    createProduct: (req, res) => {
        res.render('../src/views/products/createProduct')
    },
    storeProduct: async (req, res) => {
        const resultValidation = validationResult(req); // GUARDA LOS ERRORES DE VALIDACIÓN EN UNA VARIABLE
        if (resultValidation.errors.length > 0) {  // SI HAY UN ERROR DE VALIDACIÓN RENDERIZA EL FORMULARIO DE REGISTRO CON LOS ERRORES Y LOS CAMPOS AUTOCOMPLETADOS
			return res.render('../src/views/products/createProduct', {
				errors: resultValidation.mapped(), // ENVÍA ERRORES DE VALIDACIÓN A LA VISTA COMO OBJETOS
				oldData: req.body // ENVÍA A LA VISTA LA INFORMACIÓN PREVIAMENTE COMPLETADA
			});
		}

        let productInDB = await db.Product.findOne({ // BUSCA EL PRODUCT INGRESADO POR EL USUARIO EN LA BASE DE DATOS
			where: {
				product_name: req.body.product_name

			}
		}) 

			if (productInDB) {
				return res.render('../src/views/product/createProduct', { // SI ENCUENTRA EL PRODUCT RENDERIZA EL FORMULARIO DE CREACION DE PRODUCT INDICANDO QUE EL PRODUCTO YA ESTÁ REGISTRADO Y LOS CAMPOS AUTOCOMPLETADOS
					errors: {
						product_name: {
							msg: 'Este producto ya fue creado'
						}
					},
					oldData: req.body
				});
			}

            let product = await db.Product.create({
                product_name : req.body.product_name,
                price: req.body.price,
                discount: req.body.discount,
                category: req.body.category,
            })
            .catch(error => {
                console.log(error)
                return res.render('../src/views/main/home', { 
                    error: error
                });
            })
            
            product.addSize(req.body.size, {through: {stock: req.body.quantity, color: req.body.color, image: req.file.filename}})
            .catch(error => {
                console.log(error)
                return res.render('../src/views/main/home', { 
                    error: error
                });
            })

            res.redirect('/productos')


    },
    editProduct: async (req, res) => {
        let product = await db.Product.findByPk(req.params.id)
        .catch(error => {
            console.log(error)
            return res.render('../src/views/main/home', { 
                error: error
            });
        })
        let productSize = await db.Product_Size.findAll({
            where: {
                id_product: req.params.id
            }
        })
        let sizesId = [];
        for (let i=0; i<productSize.length; i++) {
            sizesId.push(productSize[i].dataValues.id_size)
        }

        product = {
            ...product,

        }
    
        console.log(product.dataValues.product_name)
    

        res.render('../src/views/products/productEdit', {product: product.dataValues, sizesId: sizesId});
    },
    updateProduct: async (req, res) => {
        let id = req.params.id;

        if (req.file.filename){

            let productUpdated = await db.Product.update(
                {
                    product_name : req.body.product_name,
                    price: req.body.price,
                    discount: req.body.discount,
                    color: req.body.color,
                    category: req.body.category,
                    image: req.file.filename
                },
                {
                    where: {id: req.params.id}
                }
            )
            .catch(error => {
                console.log(error)
                return res.render('../src/views/main/home', { 
                    error: error
                });
            })
            res.redirect('/productos')
        } else {
            let productUpdated = await db.Product.update(
                {
                    product_name : req.body.product_name,
                    price: req.body.price,
                    discount: req.body.discount,
                    color: req.body.color,
                    category: req.body.category,
                },
                {
                    where: {id: req.params.id}
                }
            )
            .catch(error => {
                console.log(error)
                return res.render('../src/views/main/home', { 
                    error: error
                });
            })
            res.redirect('/productos');
        }
    },
    deleteProduct: (req, res) => {

        db.Product_Size.destroy({
            where: {id_product: req.params.id}
        })
        .then(() => {
            db.Product.destroy({
                where: {id: req.params.id}
            })
            .then(() => {
                res.redirect('/productos')
            })
        })
        .catch(error => {
            console.log(error)
            return res.render('../src/views/main/home', { 
                error: error
            });
        })
    }
};

module.exports = productController;