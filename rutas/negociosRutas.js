const express = require('express');
const router = express.Router();
const { isAdmin, subirArchivoN } = require('../middlewares/middlewares');
const {
  mostrarNegocio,
  buscarNegocioID,
  nuevoNegocio,
  modificarNegocio,
  borrarNegocio,
  mostrarNegociosUsuario,
} = require("../bd/negocioBD");
const { buscarUsuarioID } = require("../bd/usuarioBD");

router.get("/negocios", async (req, res) => {
  try {
    var negocios = await mostrarNegocio();
    res.render("administrador/negocios/mostrar", { negocios });
  } catch (error) {
    console.error("Error al obtener negocios:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/nuevonegocio", (req, res) => {
  res.render("administrador/negocios/nuevo");
});

router.post("/nuevonegocio", subirArchivoN(), async (req, res) => {
  try {
    req.body.identificacion = req.file.originalname;
    var error = await nuevoNegocio(req.body);
    res.redirect("/negocios");
  } catch (error) {
    console.error("Error al crear nuevo negocio:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/editarnegocio/:id", async (req, res) => {
  try {
    var negocio = await buscarNegocioID(req.params.id);
    res.render("administrador/negocios/modificar", { negocio });
  } catch (error) {
    console.error("Error al obtener negocio para editar:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/editarnegocio", subirArchivoN(), async (req, res) => {
  try {
    if (req.file != null) {
      req.body.identificacion = req.file.filename;
    } else {
      req.body.identificacion = req.body.fotoAnterior;
    }
    var error = await modificarNegocio(req.body);
    res.redirect("back");
  } catch (error) {
    console.error("Error al editar negocio:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/borrarnegocio/:id", async (req, res) => {
  try {
    await borrarNegocio(req.params.id);
    res.redirect("back");
  } catch (err) {
    console.log("Error al borrar el producto" + err);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/negocio/:idUser/:idNegocio", isAdmin, async (req, res) => {
  try {
    var user = await buscarUsuarioID(req.params.idUser);
    var negocios = await buscarNegocioID(req.params.idNegocio);
    console.log(negocios);
    res.render("sitio/negocios", { user, negocios });
  } catch (error) {
    console.error("Error al obtener negocio para mostrar:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/nuevosnegocios/:id", async (req, res) => {
  try {
    var user = await buscarUsuarioID(req.params.id);
    res.render("sitio/nuevonegocio", { user });
  } catch (error) {
    console.error("Error al obtener usuario para nuevos negocios:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/nuevosnegocios/:id", subirArchivoN(), async (req, res) => {
  try {
    var idUsuario = req.params.id;
    req.body.userid = idUsuario;
    req.body.identificacion = req.file.filename;
    var error = await nuevoNegocio(req.body, idUsuario);
    res.redirect(`/perfilnegocio/${idUsuario}`);
  } catch (error) {
    console.error("Error al crear nuevo negocio para usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/perfilnegocio/:id", async (req, res) => {
  try {
    var user = await buscarUsuarioID(req.params.id);
    var negocios = await mostrarNegociosUsuario(req.params.id);
    res.render("sitio/perfilnegocio", { user, negocios });
  } catch (error) {
    console.error("Error al obtener perfil del negocio:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/modificarnegocio/:idUser/:idNegocio", async (req, res) => {
  try {
    var user = await buscarUsuarioID(req.params.idUser);
    var negocio = await buscarNegocioID(req.params.idNegocio);
    res.render("sitio/modificarnegocio", { user, negocio });
  } catch (error) {
    console.error("Error al obtener datos para modificar negocio:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/modificarnegocio", subirArchivoN(), async (req, res) => {
  try {
    if (req.file != null) {
      req.body.identificacion = req.file.filename;
    } else {
      req.body.identificacion = req.body.fotoAnterior;
    }
    var error = await modificarNegocio(req.body);
    res.redirect("back");
  } catch (error) {
    console.error("Error al modificar negocio:", error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
