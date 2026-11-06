/* Boton reutilizable. El color indica la consecuencia de la accion,
   tal como se justifico en el prototipo. */
export default function Boton({ color = 'verde', tipo = 'button', children, ...resto }) {
  return (
    <button type={tipo} className={`boton boton-${color}`} {...resto}>
      {children}
    </button>
  );
}
