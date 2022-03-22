module.exports = (sequelize, DataTypes) => {
    const alias = 'Color';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        color: {
            type: DataTypes.STRING
        }
    }
    const config = {
        tableName: 'colors',
        timestamps: false
   }

   const Color = sequelize.define(alias, cols, config); 

//    Color.associate = models => {
//     Color.belongsToMany(models.Product, {
//         as: 'products',
//         through: models.Product_Size,
//         foreignKey: 'id_color',
//         otherKey: 'id_product',
//         timestamps: false,
//         onDelete: 'cascade'
//     });
// }

   return Color;
   }