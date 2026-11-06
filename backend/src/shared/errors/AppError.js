/* Error "esperado" de la aplicacion: lo lanzamos nosotros a proposito
   cuando una regla de negocio no se cumple. Lo que no herede de aqui
   se trata como fallo no previsto y responde 500. */
class AppError extends Error {
  constructor(mensaje, estadoHttp = 400) {
    super(mensaje);
    this.nombre = 'AppError';
    this.estadoHttp = estadoHttp;
  }
}

module.exports = AppError;
