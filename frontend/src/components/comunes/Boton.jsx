/* Boton reutilizable. El color indica la consecuencia de la accion,
   tal como se justifico en el prototipo.

   Cuando se le pasa ocupado, el boton queda desactivado y cambia su
   texto, que es lo que impide enviar un formulario dos veces con
   doble clic. */
export default function Boton({
  color = 'verde', tipo = 'button', ocupado = false,
  textoOcupado = 'Enviando...', deshabilitado = false, children, ...resto
}) {
  return (
    <button
      type={tipo}
      className={`boton boton-${color}`}
      disabled={ocupado || deshabilitado}
      aria-busy={ocupado ? 'true' : undefined}
      {...resto}
    >
      {ocupado ? textoOcupado : children}
    </button>
  );
}
