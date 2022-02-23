const fs = require('fs');
const path = require('path');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");

const rutaProductos = path.join(__dirname, '../database/products.json');
const productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));


const productController = {
    productsList: (req, res) => {

        db.Product.findAll()
        .then(products => {

            res.render('../src/views/products/productList', {products: products});
        })
        .catch(error => {
			console.log(error)
			return res.render('../src/views/main/home', { 
				error: error
			});
		})

    },
    productosCasual: (req, res) => {
        db.Product.findAll({
            where: {
                category: 'casual'
            }
        })
        .then(products => {
            console.log(products[0].product_name)
            res.render('../src/views/products/productsCasual', {products: products});
        })
        .catch(error => {
			console.log(error)
			return res.render('../src/views/main/home', { 
				error: error
			});
		})
        // let productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
        // res.render('../src/views/products/productsCasual', {productos: productos});
    },
    productosFutbol: (req, res) => {
        db.Product.findAll({
            where: {
                category: 'futbol'
            }
        })
        .then(products => {
            res.render('../src/views/products/productsFutbol', {products: products});
        })
        .catch(error => {
			console.log(error)
			return res.render('../src/views/main/home', { 
				error: error
			});
		})

        // let productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
        // res.render('../src/views/products/productsFutbol', {productos: productos});
    },
    productosRunning: (req, res) => {
        db.Product.findAll({
            where: {
                category: 'running'
            }
        })
        .then(products => {
            res.render('../src/views/products/productsRunning', {products: products});
        })
        .catch(error => {
			console.log(error)
			return res.render('../src/views/main/home', { 
				error: error
			});
		})


        // let productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
        // res.render('../src/views/products/productsRunning', {productos: productos});
    },
    productDetail: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then(product => {
           
            product = {
                id: product.id,
                product_name: product.product_name,
                price: product.price,
                discount: product.discount,
                color: product.color,
                category: product.category,
                size: product.size,
                image: product.image
            }
            res.render('../src/views/products/productDetail', {product: product});
        })
        .catch(error => {
			console.log(error)
			return res.render('../src/views/main/home', { 
				error: error
			});
		})



        // let productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
        // let id = req.params.id;
		// let productoAMostrar = productos.find(element => element.id == id);
        // res.render('../src/views/products/productDetail', {producto: productoAMostrar});
    },
    createProduct: (req, res) => {
        res.render('../src/views/products/createProduct')
    },
    storeProduct: async (req, res) => {


            let product = await db.Product.create({
                product_name : req.body.product_name,
                price: req.body.price,
                discount: req.body.discount,
                color: req.body.color,
                category: req.body.category,
                image: req.file.filename
            })
                
            product.addSize(req.body.size, {through: {stock: req.body.quantity}})
            
            res.redirect('/productos')

            .catch(error => {
                console.log(error)
                return res.render('../src/views/main/home', { 
                    error: error
                });
            })

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
        console.log(productSize[0].dataValues);
        console.log(sizesId)

        product = {
            ...product,

        }
    
        console.log(product.dataValues.product_name)
    

        res.render('../src/views/products/productEdit', {product: product.dataValues, sizesId: sizesId});


        // let productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
        // let id = req.params.id;
		// let productoAMostrar = productos.find(element => element.id == id);
        // res.render('../src/views/products/productEdit', {producto: productoAMostrar});
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


        // let id = req.params.id;
		// let productoModificado = productos.map(producto => {
		// 	if (producto.id == id) {
		// 		producto = {
        //             ...producto,
		// 			...req.body
		// 		}
        //         if (Array.isArray(req.files)){
        //             for (let i=0; i < req.files.length; i++) {
        //                 producto[req.files[i].fieldname] = req.files[i].filename;
        //         }}
        //         return(producto);
		// 	}
        //     return producto;
        // });

		// let productosJSON = JSON.stringify(productoModificado, null, 2)  // el 2 hace que quede uno abajo del otro en la base de datos
		// fs.writeFileSync(rutaProductos,productosJSON);

		// res.redirect('/productos');
    },
    deleteProduct: (req, res) => {

        db.Product.destroy({
            where: {id: req.params.id}
        })
        // onDeleteCascade
        .then(() => {
            res.redirect('/productos')
        })
        .catch(error => {
            console.log(error)
            return res.render('../src/views/main/home', { 
                error: error
            });
        })




        // const productos = JSON.parse(fs.readFileSync(rutaProductos, 'utf-8'));
		// let id = req.params.id;
		// let productosNoBorrados = productos.filter((producto) => {
		// 	return producto.id != id;
		// });

		// let productosJSON = JSON.stringify(productosNoBorrados, null, 2)  // el 2 hace que quede uno abajo del otro en la base de datos
		// fs.writeFileSync(rutaProductos,productosJSON);
        // res.redirect('/productos')
    }
};

module.exports = productController;