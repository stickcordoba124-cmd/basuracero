import { useCallback, useEffect, useState } from 'react';

/* Hook para cualquier pantalla que cargue datos.

   Antes cada pantalla importaba el archivo de datos y lo pintaba de
   una vez, asi que ninguna tenia estado de cargando ni de error.
   Este hook deja los tres estados en un solo lugar y evita repetir
   el mismo bloque de useState y useEffect en cada archivo. */

/**
 * Ejecuta una funcion que devuelve una promesa y entrega su estado.
 * @param {() => Promise<*>} peticion funcion de src/api
 * @param {Array} dependencias valores que obligan a volver a pedir
 */
export default function usePeticion(peticion, dependencias = []) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [intento, setIntento] = useState(0);

  const reintentar = useCallback(() => setIntento((n) => n + 1), []);

  useEffect(() => {
    let vigente = true;
    setCargando(true);
    setError('');

    peticion()
      .then((respuesta) => {
        if (vigente) setDatos(respuesta);
      })
      .catch((fallo) => {
        if (vigente) setError(fallo.message);
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    /* Si la persona cambia de pantalla antes de que llegue la
       respuesta, no se escribe sobre un componente desmontado. */
    return () => { vigente = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencias, intento]);

  return { datos, cargando, error, reintentar };
}
