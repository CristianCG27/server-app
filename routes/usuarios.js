const { Router } = require("express");
const { check } = require("express-validator");

// const { validarCampos } = require("../middlewares/validar-campos");
// const { validarJWT } = require("../middlewares/validar-jwt");
// const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");

const {
  validarCampos,
  validarJWT,
  tieneRole,
  esAdminRole,
} = require("../middlewares");

const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  getUsuarioPorId,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de más de 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "El correo es inválido").isEmail(),
    check("correo").custom(emailExiste),
    //check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.patch("/", usuariosPatch);

router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.get('/:id',[
  validarJWT,
  // esAdminRole,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
], getUsuarioPorId );



module.exports = router;
