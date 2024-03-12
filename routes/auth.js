const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn, validarTokenUsuario } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

router.post("/login",[
    //validarJWT,
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),    
    validarCampos
], login );

router.post("/google",[
    //validarJWT,
    check('id_token', 'Token necesario').not().isEmpty(), 
    validarCampos
], googleSignIn);

router.get('/',[
    validarJWT
], validarTokenUsuario );




module.exports = router;