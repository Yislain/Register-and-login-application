var ruta=require("express").Router();
var{autorizado,admin}=require("../middlewares/password");
var {subirArchivoN}=require("../middlewares/middlewares");
const conexionN = require("../bd/conexion");
var { mostrarNegocio, buscarNegocioID, nuevoNegocio, modificarNegocio, borrarNegocio, mostrarNegociosUsuario, validarCamposNoVacios}=require("../bd/negocioBD");
var{buscarUsuarioID}=require("../bd/usuarioBD");


ruta.get("/api/mostrarNegocios",async(req,res)=>{
    var negocios=await mostrarNegocio();
    if(negocios.length==0){
       res.status(400).json("No hay compras");
    }else{
       res.status(200).json(negocios);
    }
 });
 
 ruta.get("/api/mostrarNegociosUsuario/:id",async(req,res)=>{
   var negocios=await mostrarNegociosUsuario(req.params.id);
   if(negocios.length==0){
      res.status(400).json("No hay compras");
   }else{
      res.status(200).json(negocios);
   }
});

ruta.get("/api/mostrarUsuariosCalificados/:id",async(req,res)=>{
   var negocios=await mostrarUsuariosCalificados(req.params.id);
   if(negocios.length==0){
      res.status(400).json("No hay compras");
   }else{
      res.status(200).json(negocios);
   }
});
 
 ruta.post("/api/nuevoNegocio/:id", subirArchivoN(), async(req,res)=>{
      req.body.identificacion=req.file.filename;
    var error=await nuevoNegocio(req.body,req.params.id);
    if(error==0){
       res.status(200).json("Compra registrado correctamente");
    }else{
       res.status(400).json("Error al registrar la compra");
    }
 });
 
 ruta.get("/api/buscarNegocioporId/:id",async(req,res)=>{
    var negocio=await buscarNegocioID(req.params.id);
    if(negocio==""){
       res.status(400).json("Compra no encontrada");
    }else{
       res.status(200).json(negocio);
    }
 });
 
 ruta.post("/api/editarNegocio",subirArchivoN(),async(req,res)=>{
      req.body.identificacion=req.file.filename;
    var error=await modificarNegocio(req.body);
    if(error==0){
       res.status(200).json("compra actualizada correctamente");
    }else{
       res.status(400).json("Error al actualizar la compra");
    }
 });
 
 ruta.get("/api/borrarNegocio/:id",async(req,res)=>{
    var error=await borrarNegocio(req.params.id);
    if(error==0){
       res.status(200).json("Compra borrada");
    }else{
       res.status(400).json("Error al borrar la compra")
    }
 });
 module.exports=ruta;