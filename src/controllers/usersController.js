const fs = require('fs');
const path = require('path');

const usersRoute = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersRoute, 'utf-8'));

const usersController = {
    account: (req, res) => {
        res.render('../src/views/users/account');
    },
    register: (req, res) => {
        
    },
    login: (req, res) => {
        
    },
    profile: (req, res) => {
        res.render('../src/views/users/profile');
    }
};

module.exports = usersController;