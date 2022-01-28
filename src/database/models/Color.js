module.exports = (sequelize, DataTypes) => {
    const alias = 'Color';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.STRING
        }
    }
    const config = {
        tableName: 'colors',
        timestamps: false
   }

   const Color = sequelize.define(alias, cols, config); 
   return Color;
   }