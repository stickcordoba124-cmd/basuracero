const servicio = require('./asignacion.service');

async function asignar(peticion, respuesta, siguiente) {
  try {
    const datos = await servicio.asignar(
      peticion.usuario.idUsuario,
      Number(peticion.params.id),
      peticion.body
    );
    return respuesta.status(201).json({ exito: true, datos });
  } catch (error) {
    return siguiente(error);
  }
}

module.exports = { asignar };
