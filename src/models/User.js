const fs = require('fs');
const path = require('path');

const usersRoute = path.join(__dirname, '../data/users.json');

const User = {
	fileName: usersRoute,    // RUTA AL ARCHIVO DE LA BASE DE DATOS

	getData: function () {                // FUNCIÓN QUE CONVIERTE EN ARRAY AL JSON DE BASE DE DATOS DE USUARIOS
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

    findAll: function () {            // FUNCIÓN QUE TRAE A TODOS LOS USUARIOS DE LA BASE DE DATOS COMO ARRAY
		return this.getData();
	},

	generateId: function () {           // FUNCIÓN QUE GENERA UN ID NUEVO PARA UN USUARIO NUEVO
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},

	findByPk: function (id) {         // FUNCIÓN QUE BUSCA A UN USUARIO POR ID (PRIMARY KEY)
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser.id === id);
		return userFound;
	},

	findByField: function (field, text) {   // FUNCIÓN QUE BUSCA A UN USUARIO POR CUALQUIER CAMPO (TRAE AL PRIMERO QUE ENCUENTRE)
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},

	create: function (userData) {            // FUNCIÓN QUE CREA UN USUARIO NUEVO CON LA INFORMACIÓN DEL USUARIO RECIBIDA
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData
		}
		allUsers.push(newUser);
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},

	edit: function (userData) {
		let allUsers = this.findAll();
		
	},

	delete: function (id) {               // FUNCIÓN QUE ELIMINA UN USUAIO POR ID
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
		return true;
	}
}

module.exports = User;