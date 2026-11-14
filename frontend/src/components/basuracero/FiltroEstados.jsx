/* Grupo de pildoras para filtrar por estado.
   El mapa y el historial tenian este mismo bloque escrito dos veces,
   con los mismos cuatro valores. Ahora es un solo componente. */
export const ESTADOS_FILTRO = ['Todos', 'Pendiente', 'En proceso', 'Atendido'];

export default function FiltroEstados({ valor, alElegir, etiqueta }) {
  return (
    <div className="pildoras" role="group" aria-label={etiqueta}>
      {ESTADOS_FILTRO.map((f) => (
        <button
          key={f}
          type="button"
          className="pildora pildora-oscura"
          aria-pressed={valor === f}
          onClick={() => alElegir(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
