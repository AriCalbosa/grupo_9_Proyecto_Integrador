module.exports = (sequelize, DataTypes) => {
    const alias = 'Product_Size';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_product: {
            type: DataTypes.INTEGER
        },
        id_size: {
            type: DataTypes.INTEGER
        },
        color: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.INTEGER
        }
    }
    const config = {
        tableName: 'products_sizes',
        timestamps: false
   }

   const Product_Size = sequelize.define(alias, cols, config); 
   return Product_Size;
   }