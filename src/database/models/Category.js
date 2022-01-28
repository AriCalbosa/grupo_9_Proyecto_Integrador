module.exports = (sequelize, DataTypes) => {
    const alias = 'Category';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: DataTypes.STRING
        }
    }
    const config = {
        tableName: 'categories',
        timestamps: false
   }

   const Category = sequelize.define(alias, cols, config); 
   return Category;
   }