import { useState } from 'react';

/* Hook de formulario.

   El inicio de sesion, el registro y el nuevo reporte repetian el
   mismo bloque: un estado por campo, una funcion validar, un objeto
   de errores y el envio. Aqui queda una sola vez.

   Tambien resuelve el doble envio: mientras enviando sea true, el
   boton queda desactivado y la funcion de envio no vuelve a correr. */

/**
 * @param {object} inicial valores con los que arranca el formulario
 * @param {(valores: object) => object} validar devuelve un objeto de errores
 */
export default function useFormulario(inicial, validar) {
  const [valores, setValores] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');

  /* Devuelve el manejador de un campo. Los valores ya escritos se
     conservan, porque siempre se parte del estado anterior. */
  const cambiar = (campo) => (valor) => {
    setValores((v) => ({ ...v, [campo]: valor }));
    setErrores((e) => (e[campo] ? { ...e, [campo]: undefined } : e));
  };

  const tocado = Object.values(valores).some((v) => v !== '' && v !== false);

  /**
   * @param {(valores: object) => Promise<*>} accion lo que se hace si todo es valido
   */
  const enviar = (accion) => async (evento) => {
    evento.preventDefault();
    if (enviando) return;

    const encontrados = validar(valores);
    const limpios = Object.fromEntries(
      Object.entries(encontrados).filter(([, v]) => Boolean(v)),
    );
    setErrores(limpios);
    setErrorGeneral('');
    if (Object.keys(limpios).length > 0) return;

    setEnviando(true);
    try {
      await accion(valores);
    } catch (fallo) {
      setErrorGeneral(fallo.message);
    } finally {
      setEnviando(false);
    }
  };

  return {
    valores, errores, enviando, errorGeneral, tocado,
    cambiar, enviar, setErrorGeneral, setValores,
  };
}
