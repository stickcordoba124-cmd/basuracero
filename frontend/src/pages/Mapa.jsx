import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarraInferior from '../components/basuracero/BarraInferior.jsx';
import FiltroEstados from '../components/basuracero/FiltroEstados.jsx';
import { Cargando, ErrorCarga, SinResultados } from '../components/comunes/Estados.jsx';
import usePeticion from '../hooks/usePeticion.js';
import { listarReportes } from '../api/reportesApi.js';
import { etiquetaDeEstado } from '../data/datosDemo.js';

/* Nivel 2, modulo 2. Mapa de reportes.
   La leyenda escribe el nombre de cada estado, de modo que quien
   no distinga bien los colores igual entiende la informacion. */
const CLASE_PIN = {
  Pendiente: 'pin-pendiente',
  'En proceso': 'pin-proceso',
  Atendido: 'pin-atendido',
};

export default function Mapa() {
  const navegar = useNavigate();
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const { datos, cargando, error, reintentar } = usePeticion(listarReportes);

  const reportes = datos ?? [];
  const visibles = reportes.filter((r) => {
    const porEstado = filtro === 'Todos' || etiquetaDeEstado(r.estado) === filtro;
    const porTexto = r.direccion.toLowerCase().includes(busqueda.trim().toLowerCase());
    return porEstado && porTexto;
  });

  return (
    <>
      <div className="cuerpo" id="contenido">
        <div className="seccion seccion-lista">
          <div className="campo">
            <label htmlFor="busqueda">Buscar sector o direccion</label>
            <input
              id="busqueda" name="busqueda" type="search" value={busqueda}
              placeholder="Buscar sector o direccion..."
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <FiltroEstados valor={filtro} alElegir={setFiltro} etiqueta="Filtrar reportes por estado" />

          {cargando && <Cargando texto="Cargando el mapa..." />}
          {error && <ErrorCarga mensaje={error} alReintentar={reintentar} />}

          {!cargando && !error && (
            <>
              <div className="lienzo-mapa" role="group" aria-label="Mapa de reportes del municipio">
                {visibles.map((r) => (
                  <button
                    key={r.id_reporte}
                    type="button"
                    className={`pin ${CLASE_PIN[etiquetaDeEstado(r.estado)]}`}
                    style={{ left: `${r.x}%`, top: `${r.y}%` }}
                    onClick={() => navegar(`/detalle/${r.id_reporte}`)}
                    aria-label={`${r.titulo}, ${r.direccion}, estado ${etiquetaDeEstado(r.estado)}`}
                    title={r.titulo}
                  >
                    &#9679;
                  </button>
                ))}
                {visibles.length === 0 && <SinResultados texto="No hay reportes con ese filtro." />}
              </div>

              <div className="leyenda">
                <strong className="leyenda-titulo">Estado de los reportes</strong>
                <span><i className="punto punto-pendiente" aria-hidden="true" /> Pendiente</span>
                <span><i className="punto punto-proceso" aria-hidden="true" /> En proceso</span>
                <span><i className="punto punto-atendido" aria-hidden="true" /> Atendido</span>
              </div>

              <p className="apoyo nota-campo">
                {visibles.length} de {reportes.length} reportes visibles. Toca un punto para abrir el caso.
              </p>
            </>
          )}
        </div>
      </div>
      <BarraInferior />
    </>
  );
}
