const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, esAdminRole } = require("../middlewares");
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validators");

const router = Router();

//Obtener todas las categorias - público
router.get("/", obtenerCategorias);

//Obtener una de las categorias - público
router.get("/:id", [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
    ],
    obtenerCategoria);

//Crear una categoria - privado
router.post("/", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ],
    crearCategoria);

//Actualizar registro por ID - privado
router.put("/:id", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoria ),
    validarCampos
    ],
    actualizarCategoria);

//Borrar una de las categorias -Admin
router.delete("/:id",[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria);

module.exports = router;
