const fs = require('fs');
const path = require('path');

const rutaPerfiles = path.join(__dirname, '../data/perfiles.json');
const perfiles = JSON.parse(fs.readFileSync(rutaPerfiles, 'utf-8'));

const userController = {
    cuenta: (req, res) => {
        res.render('../src/views/users/register-login');
    },
    ingresar: (req, res) => {
        
    },
    crear: (req, res) => {
        
    },
    perfil: (req, res) => {
        res.render('../src/views/users/profile');
    }
};

module.exports = userController;