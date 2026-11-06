import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarraInferior from '../components/BarraInferior.jsx';
import { REPORTES, etiquetaDeEstado } from '../data/datosDemo.js';

/* Nivel 2, modulo 2. Mapa de reportes.
   La leyenda escribe el nombre de cada estado, de modo que quien
   no distinga bien los colores igual entiende la informacion. */
const FILTROS = ['Todos', 'Pendiente', 'En proceso', 'Atendido'];
const COLORES = { Pendiente: '#F26722', 'En proceso': '#6B7A82', Atendido: '#1B8A4E' };

export default function Mapa() {
  const navegar = useNavigate();
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const visibles = REPORTES.filter((r) => {
    const porEstado = filtro === 'Todos' || etiquetaDeEstado(r.estado) === filtro;
    const porTexto = r.direccion.toLowerCase().includes(busqueda.trim().toLowerCase());
    return porEstado && porTexto;
  });

  return (
    <>
      <div className="cuerpo" id="contenido">
        <div className="seccion" style={{ paddingTop: 14 }}>
          <div className="campo">
            <label htmlFor="busqueda">Buscar sector o direccion</label>
            <input
              id="busqueda" type="search" value={busqueda}
              placeholder="Buscar sector o direccion..."
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="pildoras" role="group" aria-label="Filtrar reportes por estado">
            {FILTROS.map((f) => (
              <button
                key={f} type="button" className="pildora pildora-oscura"
                aria-pressed={filtro === f} onClick={() => setFiltro(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="lienzo-mapa" style={{ marginTop: 12 }} role="group" aria-label="Mapa de reportes del municipio">
            {visibles.map((r) => (
              <button
                key={r.id_reporte} type="button" className="pin"
                style={{ left: `${r.x}%`, top: `${r.y}%`, color: COLORES[etiquetaDeEstado(r.estado)] }}
                onClick={() => navegar(`/detalle/${r.id_reporte}`)}
                aria-label={`${r.titulo}, ${r.direccion}, estado ${etiquetaDeEstado(r.estado)}`}
                title={r.titulo}
              >
                &#9679;
              </button>
            ))}
            {visibles.length === 0 && <p className="vacio">No hay reportes con ese filtro.</p>}
          </div>

          <div className="leyenda">
            <strong style={{ width: '100%', fontSize: 13 }}>Estado de los reportes</strong>
            <span><i className="punto" style={{ background: COLORES.Pendiente }} aria-hidden="true" /> Pendiente</span>
            <span><i className="punto" style={{ background: COLORES['En proceso'] }} aria-hidden="true" /> En proceso</span>
            <span><i className="punto" style={{ background: COLORES.Atendido }} aria-hidden="true" /> Atendido</span>
          </div>

          <p className="apoyo" style={{ marginTop: 10 }}>
            {visibles.length} de {REPORTES.length} reportes visibles. Toca un punto para abrir el caso.
          </p>
        </div>
      </div>
      <BarraInferior />
    </>
  );
}
