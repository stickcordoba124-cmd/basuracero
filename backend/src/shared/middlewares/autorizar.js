const AppError = require('../errors/AppError');

/* Se aplica en toda ruta que modifique datos. Separar autenticar de
   autorizar evita el error clasico de dejar entrar a cualquiera que
   tenga sesion abierta, sin mirar su rol. */
function autorizar(...rolesPermitidos) {
  return function (peticion, respuesta, siguiente) {
    if (!peticion.usuario) {
      return siguiente(new AppError('Debe iniciar sesion para usar este recurso.', 401));
    }
    if (!rolesPermitidos.includes(peticion.usuario.rol)) {
      return siguiente(new AppError('Su rol no tiene permiso para esta accion.', 403));
    }
    return siguiente();
  };
}

module.exports = autorizar;
