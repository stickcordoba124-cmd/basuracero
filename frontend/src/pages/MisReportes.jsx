import { useState } from 'react';
import BarraInferior from '../components/basuracero/BarraInferior.jsx';
import TarjetaReporte from '../components/basuracero/TarjetaReporte.jsx';
import FiltroEstados from '../components/basuracero/FiltroEstados.jsx';
import Aviso from '../components/comunes/Aviso.jsx';
import { Cargando, ErrorCarga, SinResultados } from '../components/comunes/Estados.jsx';
import usePeticion from '../hooks/usePeticion.js';
import { useSesion } from '../context/SesionContext.jsx';
import { listarMisReportes } from '../api/reportesApi.js';
import { etiquetaDeEstado } from '../data/datosDemo.js';

/* Nivel 2, modulo 3. Historial personal del ciudadano.
   Los filtros por estado evitan revisar toda la lista cuando
   solo interesa lo que sigue pendiente. */
export default function MisReportes() {
  const { usuario } = useSesion();
  const [filtro, setFiltro] = useState('Todos');
  const { datos, cargando, error, reintentar } = usePeticion(
    () => listarMisReportes(usuario.id_usuario),
    [usuario.id_usuario],
  );

  const visibles = (datos ?? []).filter(
    (r) => filtro === 'Todos' || etiquetaDeEstado(r.estado) === filtro,
  );

  return (
    <>
      <div className="cuerpo" id="contenido">
        <header className="cabecera cabecera-oscura">
          <h1>Mis reportes</h1>
        </header>

        <div className="seccion seccion-lista">
          <FiltroEstados valor={filtro} alElegir={setFiltro} etiqueta="Filtrar mis reportes por estado" />

          <div className="lista-reportes">
            {cargando && <Cargando texto="Cargando tus reportes..." />}
            {error && <ErrorCarga mensaje={error} alReintentar={reintentar} />}
            {!cargando && !error && visibles.length === 0 && (
              <SinResultados texto="No tienes reportes en ese estado." />
            )}
            {visibles.map((r) => <TarjetaReporte key={r.id_reporte} reporte={r} mostrarFecha />)}
          </div>

          <Aviso tono="exito" titulo="Gracias por cuidar tu comunidad">
            <p>Cada reporte ayuda a tener un barrio mas limpio.</p>
          </Aviso>
        </div>
      </div>
      <BarraInferior />
    </>
  );
}
