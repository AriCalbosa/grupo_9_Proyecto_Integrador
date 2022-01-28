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
        id_color: {
            type: DataTypes.INTEGER
        },
        id_category: {
            type: DataTypes.INTEGER
        },
        id_size: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING
        }
    }
    const config = {
        tableName: 'products',
        timestamps: false
   }

   const Product = sequelize.define(alias, cols, config); 
   return Product;
   }