var admin = require("firebase-admin");
var keys = require("../basededatos.json");

admin.initializeApp({
    credential: admin.credential.cert(keys)
});

var db = admin.firestore();
var conexion = db.collection("miejemploBD");
var conexionNegocio = db.collection("productos");
var conexionNegocio = db.collection("compras");

module.exports = {
    conexion,
    conexionNegocio,
    conexionNegocio,
};
