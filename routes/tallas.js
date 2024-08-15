const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, esAdminRole } = require("../middlewares");

const { existeCategoria, existeProducto, yaExisteProducto } = require("../helpers/db-validators");
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto, buscarProducto, actualizarPTalla } = require("../controllers/productos");

const router = Router();


//
router.get("/", obtenerProductos );