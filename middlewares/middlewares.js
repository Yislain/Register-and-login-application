const multer = require("multer");

function subirArchivoU() {
  var storage = multer.diskStorage({
    destination: './web/Usuarios/images',
    filename: (req, file, cb) => {
      var archivo = Date.now() + file.originalname;
      cb(null, archivo);
    },
  });
  return multer({ storage }).single('foto');
}

function subirArchivoN() {
  var storage = multer.diskStorage({
    destination: './web/Negocios/images',
    filename: (req, file, cb) => {
      var archivo = Date.now() + file.originalname;
      cb(null, archivo);
    },
  });
  return multer({ storage }).single('identificacion');
}

function subirArchivoP() {
  var storage = multer.diskStorage({
    destination: './web/Productos/images',
    filename: (req, file, cb) => {
      var archivo = Date.now() + file.originalname;
      cb(null, archivo);
    },
  });
  return multer({ storage }).single('foto');
}

function isAdmin(req, res, next) {
  // Verificar si el usuario es administrador
  if (req.user && req.user.admin) {
    return next();
  }
  return res.status(403).send('Acceso prohibido');
}

module.exports = {
  subirArchivoU,
  subirArchivoN,
  subirArchivoP,
  isAdmin
};
