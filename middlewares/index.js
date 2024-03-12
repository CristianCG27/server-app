
const validaCampos          = require("../middlewares/validar-campos");
const validaJWT             = require("../middlewares/validar-jwt");
const tieneRole             = require("../middlewares/validar-roles");
const validarArchivoSubir   = require("../middlewares/validar-archivo")

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...tieneRole,
    ...validarArchivoSubir
}