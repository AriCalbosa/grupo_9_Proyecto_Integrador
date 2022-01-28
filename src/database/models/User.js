 module.exports = (sequelize, DataTypes) => {
     const alias = 'User';
     const cols = {
         id: {
             type: DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true
         },
         first_name: {
             type: DataTypes.STRING
         },
         last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        adress: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        profile: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        }
     }
     const config = {
         tableName: 'users',
         timestamps: false
    }

    const User = sequelize.define(alias, cols, config); 

    // User.associate = models => {
    //     User.hasMany(models.Cart, {
    //         as: 'carts',
    //         foreignKey: 'id_user'
    //     })
    // }

    return User;
    }