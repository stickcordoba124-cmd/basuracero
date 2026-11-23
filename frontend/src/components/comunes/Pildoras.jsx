/* Grupo de botones en forma de pildora.
   Se usan en lugar de listas desplegables para que cada dato
   se marque con un solo toque, como pedia el prototipo. */
export default function Pildoras({ etiqueta, opciones, valor, alElegir, variante = '' }) {
  return (
    <div className="campo" role="group" aria-label={etiqueta}>
      <span style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
        {etiqueta}
      </span>
      <div className="pildoras">
        {opciones.map((o) => (
          <button
            key={o.valor}
            type="button"
            className={`pildora ${variante}`}
            aria-pressed={valor === o.valor}
            onClick={() => alElegir(o.valor)}
          >
            {o.etiqueta}
          </button>
        ))}
      </div>
    </div>
  );
}
