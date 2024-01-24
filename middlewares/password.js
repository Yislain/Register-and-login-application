var crypto = require("crypto");

function generarPassword(password) {
    var salt = crypto.randomBytes(32).toString("hex");
    var hash = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString("hex");
    return {
        salt,
        hash
    };
}

function validarPassword(password, hash, salt) {
    var hashValidar = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString("hex");
    return hashValidar === hash;
}

function autorizado(req, res, siguiente) {
    if (req.session.usuario || req.session.admin) {
        siguiente();
        console.log("Usuario autorizado");
    } else {
        console.error("Intento de acceso no autorizado. Usuario incorrecto.");
        res.redirect("/login");
    }
}

function admin(req, res, siguiente) {
    console.log("Administrador autorizado");
    if (req.session.admin) {
        siguiente();
    } else {
        if (req.session.usuario) {
            console.error("Intento de acceso no autorizado. Usuario no es administrador.");
            res.redirect("/");
        } else {
            console.error("Intento de acceso no autorizado. Usuario incorrecto.");
            res.redirect("/login");
        }
    }
}

module.exports = {
    generarPassword,
    validarPassword,
    autorizado,
    admin
};
