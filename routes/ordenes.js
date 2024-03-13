const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, esAdminRole } = require("../middlewares");

const { getOrdenUsuario, getOrdenes } = require("../controllers/ordenes");

const router = Router();

router.get("/all", getOrdenes);

router.get("/",validarJWT, getOrdenUsuario);


module.exports = router;