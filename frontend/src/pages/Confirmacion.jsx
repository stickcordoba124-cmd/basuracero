import { useNavigate, useLocation } from 'react-router-dom';

/* Cierre lineal del formulario de reporte.
   El mapa de navegacion pedia que el envio terminara en un
   mensaje y no en una pantalla en blanco. */
export default function Confirmacion() {
  const navegar = useNavigate();
  const lugar = useLocation();
  const direccion = lugar.state?.direccion ?? '';

  return (
    <main className="cuerpo seccion" id="contenido" style={{ paddingTop: 40, textAlign: 'center' }}>
      <span className="logo-circulo" style={{ width: 72, height: 72, fontSize: 34, margin: '0 auto 16px' }} aria-hidden="true">
        &#10003;
      </span>
      <h2>Reporte enviado</h2>
      <p className="apoyo">
        Tu reporte quedo registrado{direccion ? ` en ${direccion}` : ''} y pasa a revision.
        Te avisaremos cuando cambie de estado.
      </p>
      <div style={{ marginTop: 24 }}>
        <button type="button" className="boton boton-verde" onClick={() => navegar('/inicio')}>
          Volver al inicio
        </button>
      </div>
      <div style={{ marginTop: 10 }}>
        <button type="button" className="boton boton-blanco" onClick={() => navegar('/mis-reportes')}>
          Ver mis reportes
        </button>
      </div>
    </main>
  );
}
