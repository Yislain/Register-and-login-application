const ruta = require("express").Router();
const { subirArchivoU } = require("../middlewares/middlewares");
const { autorizado } = require("../middlewares/password");
const {
  mostrarUsuarios,
  nuevoUsuario,
  modificarUsuario,
  buscarUsuarioID,
  borrarUsuario,
  login,
} = require("../bd/usuarioBD");

ruta.get("/", autorizado, async (req, res) => {
  res.redirect("/login");
});

ruta.get("/inicio/:id", autorizado, async (req, res) => {
  try {
    const user = await buscarUsuarioID(req.params.id);
    if (user) {
      res.render("sitio/inicio", { user });
    } else {
      console.log("Usuario no existe");
    }
  } catch (error) {
    console.error("Error al obtener información del usuario:", error);
    res.status(500).send("Internal Server Error");
  }
});

ruta.get("/admin", autorizado, async (req, res) => {
  try {
    const usuarios = await mostrarUsuarios();
    res.render("administrador/usuarios/mostrar", { usuarios });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Internal Server Error");
  }
});

ruta.get("/nuevousuario", (req, res) => {
  res.render("administrador/usuarios/nuevo");
});

ruta.post("/nuevousuario", subirArchivoU(), async (req, res) => {
  try {
    req.body.foto = req.file.filename;
    const error = await nuevoUsuario(req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error al crear nuevo usuario:", error);
    res.status(500).send("Internal Server Error");
  }
});

ruta.post("/nuevousuarioadmin", subirArchivoU(), async (req, res) => {
  try {
    req.body.foto = req.file.filename;
    const error = await nuevoUsuario(req.body);
    res.redirect("/admin");
  } catch (error) {
    console.error("Error al crear nuevo usuario (admin):", error);
    res.status(500).send("Internal Server Error");
  }
});

ruta.get("/editarusuario/:id", async (req, res) => {
  try {
    const user = await buscarUsuarioID(req.params.id);
    res.render("administrador/usuarios/modificar", { user });
  } catch (error) {
    console.error("Error al obtener usuario para editar:", error);
    res.status(500).send("Internal Server Error");
  }
});

ruta.post("/editarusuario", subirArchivoU(), async (req, res) => {
  try {
    if (req.file != null) {
      req.body.foto = req.file.filename;
    } else {
      req.body.foto = req.body.fotoAnterior;
    }
    const error = await modificarUsuario(req.body);
    res.redirect("/admin");
  } catch (error) {
    console.error("Error al editar usuario:", error);
    res.status(500).send("Internal Server Error");
  }
});

ruta.get("/borrarusuario/:id", async (req, res) => {
  try {
    await borrarUsuario(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error("Error al borrar usuario:", error);
    res.status(500).send("Internal Server Error");
  }
});

ruta.get("/borrarusuarioadmin/:id", async (req, res) => {
  try {
    await borrarUsuario(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    console.error("Error al borrar usuario (admin):", error);
    res.status(500).send("Internal Server Error");
  }
});

ruta.get("/login", (req, res) => {
  res.render("administrador/usuarios/login");
});

ruta.post("/login", async (req, res) => {
  try {
    const user = await login(req.body);
    if (!user) {
      res.redirect("/login");
    } else {
      if (user.admin) {
        console.log("Administrador");
        req.session.admin = req.body.usuario;
        res.redirect("/admin");
      } else {
        console.log("Usuario");
        req.session.usuario = req.body.usuario;
        res.redirect("/inicio/" + user.id);
      }
    }
  } catch (error) {
    console.error("Error al realizar login:", error);
    res.status(500).send("Internal Server Error");
  }
});

ruta.get("/perfil/:id", async (req, res) => {
  try {
    const user = await buscarUsuarioID(req.params.id);
    res.render("sitio/perfil", { user });
  } catch (error) {
    console.error("Error al obtener perfil del usuario:", error);
    res.status(500).send("Internal Server Error");
  }
});

ruta.post("/perfil", subirArchivoU(), async (req, res) => {
  try {
    if (req.file != null) {
      req.body.foto = req.file.filename;
    } else {
      req.body.foto = req.body.fotoAnterior;
    }
    const error = await modificarUsuario(req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error al editar perfil de usuario:", error);
    res.status(500).send("Internal Server Error");
  }
});

ruta.get("/registro", (req, res) => {
  res.render("sitio/registro");
});

ruta.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

ruta.get("/compras", autorizado, async (req, res) => {
  res.render("sitio/compras");
});

ruta.get("/nuevacompra", (req, res) => {
  res.render("administrador/negocios/nuevo"); // Ajusta la ruta según la estructura de tus vistas
});

module.exports = ruta;
