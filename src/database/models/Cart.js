module.exports = (sequelize, DataTypes) => {
    const alias = 'Cart';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        total_price: {
            type: DataTypes.INTEGER
        }
    }
    const config = {
        tableName: 'carts',
        timestamps: false
   }

   const Cart = sequelize.define(alias, cols, config);

//    Cart.associate = models => {
//     Cart.belongsTo(models.User, {
//         as: 'users',
//         foreignKey: 'id_user'
//     })
// }
return Cart;
}