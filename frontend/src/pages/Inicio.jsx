import { useNavigate, Link } from 'react-router-dom';
import Contadores from '../components/Contadores.jsx';
import TarjetaReporte from '../components/TarjetaReporte.jsx';
import BarraInferior from '../components/BarraInferior.jsx';
import { REPORTES, RESUMEN, USUARIO } from '../data/datosDemo.js';

/* Nivel 1 del mapa de navegacion. Nodo central del ciudadano.
   El boton de reportar es lo primero que se ve y esta a un solo
   toque, que fue el criterio de usabilidad del prototipo. */
export default function Inicio() {
  const navegar = useNavigate();
  const recientes = REPORTES.slice(0, 3);

  return (
    <>
      <div className="cuerpo" id="contenido">
        <header className="cabecera cabecera-oscura" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2, paddingBottom: 18 }}>
          <p style={{ margin: 0, fontSize: 13, color: '#C9E3D4' }}>Hola {USUARIO.nombre.split(' ')[0]}!</p>
          <h1>Bienvenido a BasuraCero</h1>
        </header>

        <div className="seccion" style={{ marginTop: 14 }}>
          <button type="button" className="boton boton-naranja" onClick={() => navegar('/nuevo-reporte')}>
            <span aria-hidden="true">&#9673;</span> Reportar microbasurero
          </button>

          <h2 className="titulo-seccion">Impacto de la comunidad</h2>
          <Contadores datos={RESUMEN} />

          <h2 className="titulo-seccion">
            Reportes recientes
            <Link className="enlace-verde" to="/mis-reportes">Ver todos</Link>
          </h2>
          {recientes.map((r) => <TarjetaReporte key={r.id_reporte} reporte={r} />)}
        </div>
      </div>
      <BarraInferior />
    </>
  );
}
