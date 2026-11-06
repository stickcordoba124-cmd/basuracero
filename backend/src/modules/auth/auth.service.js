const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const AppError = require('../../shared/errors/AppError');
const repositorio = require('./auth.repository');

/* RF.001 Autenticacion y autorizacion. */
async function iniciarSesion(correo, contrasena) {
  const usuario = await repositorio.buscarPorCorreo(correo);

  /* El mismo mensaje para correo que no existe y para contrasena errada.
     Si se diferencian, cualquiera puede averiguar que correos estan
     registrados probando uno por uno. */
  if (!usuario) {
    throw new AppError('El correo o la contrasena no son correctos.', 401);
  }

  const esContrasenaCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!esContrasenaCorrecta) {
    throw new AppError('El correo o la contrasena no son correctos.', 401);
  }

  if (usuario.estado !== 1) {
    throw new AppError('La cuenta esta suspendida. Comuniquese con el administrador.', 403);
  }

  const token = jwt.sign(
    { idUsuario: usuario.id_usuario, rol: usuario.rol, nombre: usuario.nombre },
    env.jwtSecreto,
    { expiresIn: env.jwtExpiracion }
  );

  return {
    token,
    usuario: {
      idUsuario: usuario.id_usuario,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    },
  };
}

module.exports = { iniciarSesion };
