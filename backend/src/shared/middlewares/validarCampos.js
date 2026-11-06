const AppError = require('../errors/AppError');

/* Valida por endpoint y rechaza todo campo que no este declarado.
   Si manana alguien manda "rol" dentro del cuerpo de un reporte,
   la peticion se cae aqui y no llega a tocar la base de datos. */
function validarCampos({ obligatorios = [], opcionales = [] }) {
  const permitidos = [...obligatorios, ...opcionales];

  return function (peticion, respuesta, siguiente) {
    const cuerpo = peticion.body || {};

    const sobrantes = Object.keys(cuerpo).filter((campo) => !permitidos.includes(campo));
    if (sobrantes.length > 0) {
      return siguiente(new AppError('Campos no permitidos: ' + sobrantes.join(', '), 400));
    }

    const faltantes = obligatorios.filter(
      (campo) => cuerpo[campo] === undefined || cuerpo[campo] === null || cuerpo[campo] === ''
    );
    if (faltantes.length > 0) {
      return siguiente(new AppError('Faltan campos obligatorios: ' + faltantes.join(', '), 400));
    }

    return siguiente();
  };
}

module.exports = validarCampos;
