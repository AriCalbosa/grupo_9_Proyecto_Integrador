const multer = require('multer');
const path = require('path');

const folderPath = path.resolve(__dirname, '../../public/images/adidas');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    const nuevoNombre = file.originalname + '-' + Date.now() + path.extname(file.originalname);
    // const nuevoNombre = 'producto-' + Date.now() + path.extname(file.originalname);
    cb(null, nuevoNombre);

    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage });

module.exports = upload;