const servicio = require('./auth.service');

/* Lee la peticion, llama al servicio y arma la respuesta.
   No ejecuta SQL ni decide reglas de negocio. */
async function iniciarSesion(peticion, respuesta, siguiente) {
  try {
    const { correo, contrasena } = peticion.body;
    const resultado = await servicio.iniciarSesion(correo, contrasena);
    return respuesta.status(200).json({ exito: true, datos: resultado });
  } catch (error) {
    return siguiente(error);
  }
}

module.exports = { iniciarSesion };
