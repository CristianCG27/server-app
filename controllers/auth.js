const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //verificar correo
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/constraseña no son correctos o no exste el usuario - correo",
      });
    }

    //Verificar si usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario/constraseña no son correctos - estado-false",
      });
    }

    //verificar contraseña

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario/constraseña no son correctos - contraseña",
      });

      
    }

    //Generar JWT

    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Login OK",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    //const googleUser = await googleVerify( id_token);
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      //Crrear ususario

      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }


    //si usuario en DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
      })      
    }

    //Generar JWT

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    json.status(400).json({
      ok: false,
      msg: "El token no se puede verificar",
    });
  }
};

const validarTokenUsuario = async (req, res = response ) => {

  // Generar el JWT
  const token = await generarJWT( req.usuario._id );
  
  res.json({
      usuario: req.usuario,
      token: token,
  })

}


module.exports = {
  login,
  googleSignIn,
  validarTokenUsuario
};
