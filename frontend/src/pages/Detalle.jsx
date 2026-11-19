import { useParams, useNavigate } from 'react-router-dom';
import Encabezado from '../components/basuracero/Encabezado.jsx';
import EtiquetaEstado from '../components/basuracero/EtiquetaEstado.jsx';
import BarraInferior from '../components/basuracero/BarraInferior.jsx';
import Boton from '../components/comunes/Boton.jsx';
import { Cargando, ErrorCarga, SinResultados } from '../components/comunes/Estados.jsx';
import usePeticion from '../hooks/usePeticion.js';
import { obtenerReporte } from '../api/reportesApi.js';
import { CATEGORIAS, NIVELES } from '../data/datosDemo.js';

/* Nivel 3. Detalle y seguimiento del caso.
   Los pasos cumplidos se marcan con un chulo y con texto, no solo
   con color, que era el criterio de accesibilidad del prototipo. */
export default function Detalle() {
  const { id } = useParams();
  const navegar = useNavigate();
  const { datos: reporte, cargando, error, reintentar } = usePeticion(
    () => obtenerReporte(id), [id],
  );

  const categoria = CATEGORIAS.find((c) => c.valor === reporte?.categoria_residuo);
  const nivel = NIVELES.find((n) => n.valor === reporte?.nivel_situacion);

  return (
    <>
      <Encabezado titulo="Detalle del reporte" volver oscura={Boolean(reporte)} />
      <main className="cuerpo" id="contenido">
        <div className="seccion">
          {cargando && <Cargando texto="Cargando el reporte..." />}
          {error && <ErrorCarga mensaje={error} alReintentar={reintentar} />}

          {!cargando && !error && !reporte && (
            <>
              <SinResultados texto={`No existe un reporte con el numero ${id}.`} />
              <Boton onClick={() => navegar('/mapa')}>Volver al mapa</Boton>
            </>
          )}
        </div>

        {reporte && (
          <>
            <div className="foto-detalle">
              <span className="apoyo">Foto del reporte</span>
            </div>

            <div className="seccion">
              <div className="fila-etiquetas">
                <EtiquetaEstado estado={reporte.estado} />
                <span className="etiqueta etiqueta-nivel">NIVEL {nivel?.etiqueta}</span>
                <span className="etiqueta etiqueta-categoria">{categoria?.etiqueta.toUpperCase()}</span>
              </div>

              <h2>{reporte.titulo}</h2>
              <p className="apoyo">&#9679; {reporte.direccion}</p>

              <h3 className="titulo-bloque">Descripcion</h3>
              <p>{reporte.descripcion}</p>
              <p className="apoyo">
                Reportado por: <strong className="autor">{reporte.autor}</strong> el {reporte.fecha_creacion}
              </p>

              <div className="tarjeta-verificar">
                <h3>Seguimiento del caso</h3>
                <ol className="linea-tiempo">
                  {reporte.seguimiento.map((p) => (
                    <li key={p.titulo} className={p.hecho ? 'paso' : 'paso paso-pendiente'}>
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

              <div className="pila-botones">
                <Boton color="blanco" onClick={() => navegar('/mis-reportes')}>
                  Volver a la lista
                </Boton>
              </div>
            </div>
          </>
        )}
      </main>
      <BarraInferior />
    </>
  );
}
