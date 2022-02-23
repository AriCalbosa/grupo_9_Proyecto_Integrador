module.exports = (sequelize, DataTypes) => {
    const alias = 'Size';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: DataTypes.INTEGER
        }
    }
    const config = {
        tableName: 'sizes',
        timestamps: false
   }

   const Size = sequelize.define(alias, cols, config); 


   Size.associate = models => {
    Size.belongsToMany(models.Product, {
        as: 'products',
        through: models.Product_Size,
        foreignKey: 'id_size',
        otherKey: 'id_product',
        timestamps: false,
        onDelete: 'cascade'
    });
}


   return Size;
   }