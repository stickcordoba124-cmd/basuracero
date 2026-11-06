const servicio = require('./reporte.service');

async function listar(peticion, respuesta, siguiente) {
  try {
    const datos = await servicio.listar({
      estado: peticion.query.estado,
      categoria: peticion.query.categoria,
    });
    return respuesta.status(200).json({ exito: true, datos });
  } catch (error) {
    return siguiente(error);
  }
}

async function crear(peticion, respuesta, siguiente) {
  try {
    const datos = await servicio.crear(peticion.usuario.idUsuario, peticion.body);
    return respuesta.status(201).json({ exito: true, datos });
  } catch (error) {
    return siguiente(error);
  }
}

module.exports = { listar, crear };
