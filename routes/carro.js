const router = require("express").Router();
const {
  agregarCarro,
  obtenerCarro,
  borrarProductoCarro,
  resetCarro,
} = require("../controllers/carro");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, esAdminRole } = require("../middlewares");
const { existeCarro } = require("../helpers/db-validators");

router.get(
  "/find/:uid",[
    check("uid", "No es un id de Mongo válido").isMongoId(),
    //check("uid").custom( existeCarro ),
    validarJWT,
    validarCampos,
],
  obtenerCarro
);

router.post(
  "/add/:uid",[
    check("uid", "No es un id de Mongo válido").isMongoId(),
    validarJWT,
    validarCampos,
  ],
  agregarCarro
);

router.delete(
  "/:uid",[
    check("uid", "No es un id de Mongo válido").isMongoId(),
    validarJWT,
    validarCampos,
  ],
  borrarProductoCarro
);

router.delete(
  "/delete/:uid",[
    check("uid", "No es un id de Mongo válido").isMongoId(),
    check("uid").custom(existeCarro), 
    validarJWT, 
    validarCampos
],
  resetCarro
);

module.exports = router;
