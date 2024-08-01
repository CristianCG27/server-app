const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, esAdminRole } = require("../middlewares");

const { existeCategoria, existeProducto, yaExisteProducto } = require("../helpers/db-validators");
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto, buscarProducto } = require("../controllers/productos");

const router = Router();

//Obtener todas los productos - público
router.get("/", obtenerProductos );

//Obtener uno de los productos - público
router.get("/:id", [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
    ],
    obtenerProducto);

//Obtener producto Buscado
router.get("/search/:key", buscarProducto);

//Crear un un producto - privado
router.post("/", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de Mongo válido').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos
    ],
    crearProducto);
    


//Actualizar registro por ID - privado
router.put("/:id", [
    validarJWT,
    //check('categoria', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
    ],
    actualizarProducto);

//Borrar un producto -Admin
router.delete("/:id",[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], borrarProducto);

module.exports = router;
