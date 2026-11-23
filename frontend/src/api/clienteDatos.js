/* ============================================================
   Cliente de datos

   Toda pantalla que necesite informacion pasa por src/api y
   nunca importa el archivo de datos de prueba por su cuenta.
   Esa regla quedo escrita en la seccion 2.3 del plan tecnico
   GA7-220501096-AA1-EV01.

   Hoy el proyecto todavia no consume servicios, asi que las
   funciones de esta carpeta devuelven los datos de prueba
   dentro de una promesa y con una espera corta, para que las
   pantallas se construyan con sus estados de cargando y de
   error desde ahora.

   COMO SE REEMPLAZA POR LOS DATOS REALES
   Cuando el backend este disponible, solo cambia este archivo:
   pedir() hace la peticion HTTP al servidor en lugar de
   devolver el dato de prueba. Las pantallas y los hooks no se
   tocan, porque ya trabajan contra las funciones de src/api.
   ============================================================ */

/** Milisegundos que tarda una respuesta simulada. */
const ESPERA = 350;

/**
 * Devuelve un dato dentro de una promesa, imitando una peticion.
 * @param {*} dato valor que se va a entregar
 * @param {{fallar?: string}} opciones mensaje de error para probar el estado de error
 */
export function pedir(dato, opciones = {}) {
  return new Promise((resolver, rechazar) => {
    setTimeout(() => {
      if (opciones.fallar) {
        rechazar(new Error(opciones.fallar));
        return;
      }
      resolver(dato);
    }, ESPERA);
  });
}

/* Interruptor para la demostracion del video. Al ponerlo en true,
   todas las consultas fallan y se puede mostrar el estado de error
   de cada pantalla sin tener que apagar nada. */
export const SIMULAR_FALLO = false;

export const ERROR_RED = 'No pudimos conectar con el servidor. Revisa tu conexion e intenta otra vez.';
