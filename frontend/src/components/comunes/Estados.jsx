/* Los tres estados que puede tener cualquier pantalla que carga
   datos: esperando, con error y sin resultados. Se escriben una sola
   vez para que se vean igual en toda la aplicacion. */
import Boton from './Boton.jsx';

export function Cargando({ texto = 'Cargando...' }) {
  return (
    <p className="vacio" role="status" aria-live="polite">
      <span className="punto-carga" aria-hidden="true" /> {texto}
    </p>
  );
}

export function ErrorCarga({ mensaje, alReintentar }) {
  return (
    <div className="aviso" role="alert">
      <span aria-hidden="true">&#9888;</span>
      <div>
        <strong>No se pudo cargar la informacion</strong>
        <p>{mensaje}</p>
        {alReintentar && (
          <Boton color="blanco" onClick={alReintentar}>Reintentar</Boton>
        )}
      </div>
    </div>
  );
}

export function SinResultados({ texto }) {
  return <p className="vacio">{texto}</p>;
}
