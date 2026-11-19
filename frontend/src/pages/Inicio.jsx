import { useNavigate, Link } from 'react-router-dom';
import Contadores from '../components/basuracero/Contadores.jsx';
import TarjetaReporte from '../components/basuracero/TarjetaReporte.jsx';
import BarraInferior from '../components/basuracero/BarraInferior.jsx';
import Boton from '../components/comunes/Boton.jsx';
import { Cargando, ErrorCarga, SinResultados } from '../components/comunes/Estados.jsx';
import usePeticion from '../hooks/usePeticion.js';
import { useSesion } from '../context/SesionContext.jsx';
import { listarRecientes, obtenerResumen } from '../api/reportesApi.js';

/* Nivel 1 del mapa de navegacion. Nodo central del ciudadano.
   El boton de reportar es lo primero que se ve y esta a un solo
   toque, que fue el criterio de usabilidad del prototipo. */
export default function Inicio() {
  const navegar = useNavigate();
  const { usuario } = useSesion();
  const resumen = usePeticion(obtenerResumen);
  const recientes = usePeticion(listarRecientes);

  return (
    <>
      <div className="cuerpo" id="contenido">
        <header className="cabecera cabecera-oscura cabecera-saludo">
          <p className="saludo">Hola {usuario.nombre.split(' ')[0]}!</p>
          <h1>Bienvenido a BasuraCero</h1>
        </header>

        <div className="seccion seccion-inicio">
          <Boton color="naranja" onClick={() => navegar('/nuevo-reporte')}>
            <span aria-hidden="true">&#9673;</span> Reportar microbasurero
          </Boton>

          <h2 className="titulo-seccion">Impacto de la comunidad</h2>
          {resumen.cargando && <Cargando texto="Cargando los contadores..." />}
          {resumen.error && <ErrorCarga mensaje={resumen.error} alReintentar={resumen.reintentar} />}
          {resumen.datos && <Contadores datos={resumen.datos} />}

          <h2 className="titulo-seccion">
            Reportes recientes
            <Link className="enlace-verde" to="/mis-reportes">Ver todos</Link>
          </h2>
          {recientes.cargando && <Cargando texto="Cargando los reportes..." />}
          {recientes.error && <ErrorCarga mensaje={recientes.error} alReintentar={recientes.reintentar} />}
          {recientes.datos?.length === 0 && (
            <SinResultados texto="Todavia no hay reportes en el municipio." />
          )}
          {recientes.datos?.map((r) => <TarjetaReporte key={r.id_reporte} reporte={r} />)}
        </div>
      </div>
      <BarraInferior />
    </>
  );
}
