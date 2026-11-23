import { useNavigate, useLocation } from 'react-router-dom';
import Boton from '../components/comunes/Boton.jsx';

/* Cierre lineal del formulario de reporte.
   El mapa de navegacion pedia que el envio terminara en un
   mensaje y no en una pantalla en blanco. */
export default function Confirmacion() {
  const navegar = useNavigate();
  const lugar = useLocation();
  const direccion = lugar.state?.direccion ?? '';

  return (
    <main className="cuerpo seccion centro-pantalla" id="contenido">
      <span className="logo-circulo logo-grande" aria-hidden="true">&#10003;</span>
      <h2>Reporte enviado</h2>
      <p className="apoyo">
        Tu reporte quedo registrado{direccion ? ` en ${direccion}` : ''} y pasa a revision.
        Te avisaremos cuando cambie de estado.
      </p>
      <div className="pila-botones">
        <Boton onClick={() => navegar('/inicio', { replace: true })}>Volver al inicio</Boton>
        <Boton color="blanco" onClick={() => navegar('/mis-reportes', { replace: true })}>
          Ver mis reportes
        </Boton>
      </div>
    </main>
  );
}
