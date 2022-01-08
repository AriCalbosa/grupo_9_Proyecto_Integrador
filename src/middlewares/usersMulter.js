// MIDDLEWARE DE MULTER PARA GUARDAR ARCHIVOS DE USUARIOS
const path = require('path');
const multer = require('multer');

const folderPath = path.resolve(__dirname, '../../../Proyecto/public/images/users');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {    // DEFINE LA RUTA DONDE SE VA A GUARDAR EL ARCHIVO
		cb(null, folderPath);
	},
	filename: (req, file, cb) => {      // DEFINE EL NOMBRE QUE VA A TENER EL ARCHIVO GUARDADO
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const upload = multer({ storage });

module.exports = upload;