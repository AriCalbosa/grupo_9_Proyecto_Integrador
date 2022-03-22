const fs = require('fs');
const path = require('path');


const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");



const usersController = {
    usersList: (req, res) => {
        db.User.findAll()
        .then(users => {
            let usersList =users.map(user => {
                let oneUser = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    adress: user.address,
                    profile: user.profile,
                    avatar: user.avatar
                }
                return oneUser;
            })
            let response = {
                meta: {
                    status : 200,
                    total: usersList.length,
                    url: 'http://localhost:5000/api/usuarios'
                },
                data: usersList
            }
                res.json(response);
        })
    },
    userDetail: (req, res) => {
        db.User.findByPk(req.params.id)
        .then(user => {
            user = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                adress: user.address,
                profile: user.profile,
                avatar: user.avatar
            }
            let response = {
                meta: {
                    status : 200,
                    total: 1,
                    url: 'http://localhost:5000/api/usuarios/'+user.id
                },
                data: user
            }
                res.json(response);
        })
    }
};

module.exports = usersController;