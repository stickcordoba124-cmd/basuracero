import { useNavigate } from 'react-router-dom';

/* Cabecera verde con titulo y, si se pide, boton para volver. */
export default function Encabezado({ titulo, volver = false, oscura = false }) {
  const navegar = useNavigate();
  return (
    <header className={oscura ? 'cabecera cabecera-oscura' : 'cabecera'}>
      {volver && (
        <button
          type="button"
          className="boton-volver"
          onClick={() => navegar(-1)}
          aria-label="Volver a la pantalla anterior"
        >
          &#8592;
        </button>
      )}
      <h1>{titulo}</h1>
    </header>
  );
}
