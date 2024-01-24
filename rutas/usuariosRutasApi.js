const ruta = require("express").Router();
const { subirArchivoU } = require("../middlewares/middlewares");
const { borrarUsuario, mostrarNegocio, nuevoUsuario, buscarUsuarioID, modificarUsuario } = require("../bd/usuarioBD");

ruta.get("/api/mostrarNegocios", async (req, res) => {
  try {
    const negocios = await mostrarNegocio();
    if (negocios.length === 0) {
      res.status(400).json("No hay compras");
    } else {
      res.status(200).json(negocios);
    }
  } catch (error) {
    console.error("Error al mostrar negocios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

ruta.post("/api/nuevousuario", subirArchivoU(), async (req, res) => {
  req.body.foto = req.file.originalname;
  try {
    const error = await nuevoUsuario(req.body);
    if (error === 0) {
      res.status(200).json("Usuario registrado correctamente");
    } else {
      res.status(400).json("Error al registrar el usuario");
    }
  } catch (error) {
    console.error("Error al crear nuevo usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

ruta.get("/api/buscarUsuarioPorId/:id", async (req, res) => {
  try {
    const user = await buscarUsuarioID(req.params.id);
    if (!user) {
      res.status(400).json("Usuario no encontrado");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error("Error al buscar usuario por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

ruta.post("/api/editarUsuario", subirArchivoU(), async (req, res) => {
  req.body.foto = req.file.originalname;
  try {
    const error = await modificarUsuario(req.body);
    if (error === 0) {
      res.status(200).json("Usuario actualizado correctamente");
    } else {
      res.status(400).json("Error al actualizar el usuario");
    }
  } catch (error) {
    console.error("Error al editar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta para eliminar un usuario
ruta.delete("/api/borrarUsuario/:id", async (req, res) => {
  try {
    const error = await borrarUsuario(req.params.id);
    if (error === 0) {
      res.status(200).json({ message: "Usuario borrado correctamente" });
    } else {
      res.status(400).json({ message: "Error al borrar el usuario" });
    }
  } catch (error) {
    console.error("Error al intentar borrar el usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = ruta;
