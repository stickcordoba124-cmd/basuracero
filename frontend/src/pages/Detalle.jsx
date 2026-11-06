import { useParams, useNavigate } from 'react-router-dom';
import Encabezado from '../components/Encabezado.jsx';
import EtiquetaEstado from '../components/EtiquetaEstado.jsx';
import BarraInferior from '../components/BarraInferior.jsx';
import { REPORTES, CATEGORIAS, NIVELES } from '../data/datosDemo.js';

/* Nivel 3. Detalle y seguimiento del caso.
   Los pasos cumplidos se marcan con un chulo y con texto, no solo
   con color, que era el criterio de accesibilidad del prototipo. */
export default function Detalle() {
  const { id } = useParams();
  const navegar = useNavigate();
  const reporte = REPORTES.find((r) => String(r.id_reporte) === String(id));

  if (!reporte) {
    return (
      <>
        <Encabezado titulo="Detalle del reporte" volver />
        <main className="cuerpo seccion" id="contenido">
          <p className="vacio">No se encontro ese reporte.</p>
          <button type="button" className="boton boton-verde" onClick={() => navegar('/mapa')}>
            Volver al mapa
          </button>
        </main>
        <BarraInferior />
      </>
    );
  }

  const categoria = CATEGORIAS.find((c) => c.valor === reporte.categoria_residuo);
  const nivel = NIVELES.find((n) => n.valor === reporte.nivel_situacion);

  return (
    <>
      <Encabezado titulo="Detalle del reporte" volver oscura />
      <main className="cuerpo" id="contenido">
        <div style={{ height: 170, background: 'var(--verde-claro)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="apoyo">Foto del reporte</span>
        </div>

        <div className="seccion">
          <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
            <EtiquetaEstado estado={reporte.estado} />
            <span className="etiqueta" style={{ background: '#FFE3D4', color: '#8A3C10' }}>
              NIVEL {nivel?.etiqueta}
            </span>
            <span className="etiqueta" style={{ background: 'var(--verde-claro)', color: 'var(--verde-oscuro)' }}>
              {categoria?.etiqueta.toUpperCase()}
            </span>
          </div>

          <h2>{reporte.titulo}</h2>
          <p className="apoyo">&#9679; {reporte.direccion}</p>

          <h3 style={{ marginTop: 16 }}>Descripcion</h3>
          <p>{reporte.descripcion}</p>
          <p className="apoyo">
            Reportado por: <strong style={{ color: 'var(--verde)' }}>{reporte.autor}</strong> el {reporte.fecha_creacion}
          </p>

          <div className="tarjeta-verificar" style={{ marginTop: 16 }}>
            <h3>Seguimiento del caso</h3>
            <ol className="linea-tiempo">
              {reporte.seguimiento.map((p, i) => (
                <li key={i} className={p.hecho ? 'paso' : 'paso paso-pendiente'}>
                  <span className="paso-marca" aria-hidden="true">{p.hecho ? '✓' : '○'}</span>
                  <div>
                    <p className="paso-titulo">{p.titulo}</p>
                    <p className="paso-fecha">
                      {p.fecha}
                      <span className="oculto-visual">{p.hecho ? '. Paso cumplido' : '. Paso pendiente'}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div style={{ marginTop: 14 }}>
            <button type="button" className="boton boton-blanco" onClick={() => navegar('/mis-reportes')}>
              Volver a la lista
            </button>
          </div>
        </div>
      </main>
      <BarraInferior />
    </>
  );
}
