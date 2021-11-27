const path = require('path');

const userController = {
    cuenta: (req, res) => {
        res.render('../src/views/users/register-login');
    }
};

module.exports = userController;