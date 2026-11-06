const AppError = require('../errors/AppError');

/* Un solo lugar arma la respuesta de error de toda la API. Los controladores
   no construyen respuestas de error a mano, solo dejan pasar el error.
   Asi el frontend siempre recibe la misma forma: { exito, mensaje }. */
function manejadorErrores(error, peticion, respuesta, siguiente) {
  if (respuesta.headersSent) {
    return siguiente(error);
  }

  if (error instanceof AppError) {
    return respuesta.status(error.estadoHttp).json({
      exito: false,
      mensaje: error.message,
    });
  }

  /* Nunca se expone el detalle interno al cliente. Queda en el servidor. */
  console.error('[error no previsto]', error);
  return respuesta.status(500).json({
    exito: false,
    mensaje: 'Ocurrio un error inesperado. Intente de nuevo.',
  });
}

module.exports = manejadorErrores;
