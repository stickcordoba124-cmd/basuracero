const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const AppError = require('../errors/AppError');

/* Lee el token del encabezado Authorization y deja los datos del usuario
   en peticion.usuario. No consulta la base: el token ya trae el rol. */
function autenticar(peticion, respuesta, siguiente) {
  const encabezado = peticion.headers.authorization || '';
  const [esquema, token] = encabezado.split(' ');

  if (esquema !== 'Bearer' || !token) {
    return siguiente(new AppError('Debe iniciar sesion para usar este recurso.', 401));
  }

  try {
    peticion.usuario = jwt.verify(token, env.jwtSecreto);
    return siguiente();
  } catch (error) {
    return siguiente(new AppError('La sesion expiro o el token no es valido.', 401));
  }
}

module.exports = autenticar;
