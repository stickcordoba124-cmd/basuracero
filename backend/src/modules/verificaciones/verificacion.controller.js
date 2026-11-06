const servicio = require('./verificacion.service');

async function verificar(peticion, respuesta, siguiente) {
  try {
    const datos = await servicio.verificar(
      peticion.usuario.idUsuario,
      Number(peticion.params.id),
      peticion.body.resultado,
      peticion.body.observacion
    );
    return respuesta.status(200).json({ exito: true, datos });
  } catch (error) {
    return siguiente(error);
  }
}

module.exports = { verificar };
