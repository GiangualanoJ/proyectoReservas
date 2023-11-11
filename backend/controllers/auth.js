const { response } = require("express")
const Usuario = require("../models/usuario")
const { generarJWT } = require("../helpers/jwt")
const admin = require("firebase-admin")

const login = async (req, res = response) => {

  try {
    const { firebaseToken } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
  
    const user = {
      nombre: decodedToken.name,
      email: decodedToken.email,
    };

    let usuarioDB = await Usuario.findOne({ where: { email: user.email } });

    if (!usuarioDB) {

      usuarioDB = await Usuario.create(user);
    }

    const token = await generarJWT(usuarioDB.id, usuarioDB.nombre);

    res.json({
      ok: true,
      token,
      usuario: usuarioDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

}

module.exports = {
  login
}
