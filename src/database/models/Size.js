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
        },
        active: {
            type: DataTypes.STRING
        }
    }
    const config = {
        tableName: 'sizes',
        timestamps: false
   }

   const Size = sequelize.define(alias, cols, config); 
   return Size;
   }