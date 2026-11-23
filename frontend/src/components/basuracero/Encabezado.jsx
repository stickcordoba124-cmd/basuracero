import { useNavigate } from 'react-router-dom';

/* Cabecera verde con titulo y, si se pide, boton para volver.

   alVolver permite que una pantalla haga algo antes de salir. El
   formulario de nuevo reporte lo usa para avisar que hay datos sin
   enviar. Si no se pasa, el boton simplemente vuelve atras. */
export default function Encabezado({ titulo, volver = false, oscura = false, alVolver }) {
  const navegar = useNavigate();
  const salir = () => {
    if (alVolver && alVolver() === false) return;
    navegar(-1);
  };
  return (
    <header className={oscura ? 'cabecera cabecera-oscura' : 'cabecera'}>
      {volver && (
        <button
          type="button"
          className="boton-volver"
          onClick={salir}
          aria-label="Volver a la pantalla anterior"
        >
          &#8592;
        </button>
      )}
      <h1>{titulo}</h1>
    </header>
  );
}
