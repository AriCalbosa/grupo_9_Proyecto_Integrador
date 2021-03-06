module.exports = (sequelize, DataTypes) => {
    const alias = 'Product';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        discount: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.STRING
        }
    }
    const config = {
        tableName: 'products',
        timestamps: false
   }

   const Product = sequelize.define(alias, cols, config); 

   Product.associate = models => {
       Product.belongsToMany(models.Size, {
           as: 'sizes',
           through: models.Product_Size,
           foreignKey: 'id_product',
           otherKey: 'id_size',
           timestamps: false,
           onDelete: 'cascade'
       });
   }
//    Product.associate = models => {
//     Product.belongsToMany(models.Color, {
//         as: 'colors',
//         through: models.Product_Size,
//         foreignKey: 'id_product',
//         otherKey: 'id_color',
//         timestamps: false,
//         onDelete: 'cascade'
//     });
// }


   return Product;
   }