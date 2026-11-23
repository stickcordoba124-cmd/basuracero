import { useNavigate } from 'react-router-dom';
import Contadores from '../components/basuracero/Contadores.jsx';
import Boton from '../components/comunes/Boton.jsx';
import Aviso from '../components/comunes/Aviso.jsx';
import { Cargando, ErrorCarga, SinResultados } from '../components/comunes/Estados.jsx';
import usePeticion from '../hooks/usePeticion.js';
import useVerificacion from '../hooks/useVerificacion.js';
import { useSesion } from '../context/SesionContext.jsx';
import { listarPorVerificar, listarGrupos, obtenerResumenFuncionario } from '../api/reportesApi.js';

/* Flujo alterno del mapa de navegacion. Panel del funcionario.

   Las dos decisiones principales, aprobar o descartar, estan dentro
   de la misma tarjeta del reporte, sin cambiar de pantalla.
   El color de cada boton indica la consecuencia: verde para aprobar,
   blanco para descartar y naranja para asignar. */
export default function PanelFuncionario() {
  const navegar = useNavigate();
  const { usuario, cerrarSesion } = useSesion();

  const bandeja = usePeticion(listarPorVerificar);
  const grupos = usePeticion(listarGrupos);
  const resumen = usePeticion(obtenerResumenFuncionario);

  const v = useVerificacion(bandeja.datos, grupos.datos);
  const iniciales = usuario.nombre.split(' ').map((p) => p[0]).join('').slice(0, 2);

  function salir() {
    cerrarSesion();
    navegar('/login', { replace: true });
  }

  return (
    <div className="cuerpo" id="contenido">
      <header className="cabecera cabecera-funcionario">
        <span className="avatar" aria-hidden="true">{iniciales}</span>
        <div>
          <h1 className="titulo-funcionario">{usuario.nombre}</h1>
          <p className="cargo">Funcionario de aseo municipal</p>
        </div>
      </header>

      <div className="seccion seccion-lista">
        {resumen.cargando && <Cargando texto="Cargando los contadores..." />}
        {resumen.error && <ErrorCarga mensaje={resumen.error} alReintentar={resumen.reintentar} />}
        {resumen.datos && <Contadores datos={resumen.datos} />}

        <div aria-live="polite" role="status">
          {v.aviso && <Aviso tono="exito"><p>{v.aviso}</p></Aviso>}
        </div>

        <h2 className="titulo-seccion">Reportes por verificar</h2>

        {bandeja.cargando && <Cargando texto="Cargando la bandeja..." />}
        {bandeja.error && <ErrorCarga mensaje={bandeja.error} alReintentar={bandeja.reintentar} />}
        {!bandeja.cargando && !bandeja.error && v.pendientes.length === 0 && (
          <SinResultados texto="No quedan reportes por verificar." />
        )}

        {v.casos.map((c) => (
          <article key={c.id_reporte} className="tarjeta-verificar">
            <div className="fila-tarjeta">
              <span className={c.decision === 'descartado' ? 'etiqueta etiqueta-proceso' : 'etiqueta etiqueta-pendiente'}>
                {c.decision ? c.decision.toUpperCase() : 'PENDIENTE'}
              </span>
              <span className="apoyo">{c.hace}</span>
            </div>

            <h3 className="titulo-caso">{c.titulo}</h3>
            <p className="tarjeta-lugar">{c.direccion}</p>

            {c.decision === null && (
              <div className="fila-acciones">
                <Boton color="blanco" onClick={() => v.decidir(c.id_reporte, 'descartado')}>
                  Descartar
                </Boton>
                <Boton onClick={() => v.decidir(c.id_reporte, 'aprobado')}>
                  Aprobar
                </Boton>
              </div>
            )}

            {c.decision === 'aprobado' && !c.asignado && (
              <div className="fila-asignar">
                <label htmlFor={`grupo-${c.id_reporte}`} className="oculto-visual">
                  Grupo de limpieza para el reporte {c.id_reporte}
                </label>
                <select
                  id={`grupo-${c.id_reporte}`}
                  name={`grupo-${c.id_reporte}`}
                  value={c.grupo}
                  onChange={(e) => v.elegirGrupo(c.id_reporte, e.target.value)}
                >
                  <option value="">Elegir grupo de limpieza</option>
                  {(grupos.datos ?? []).map((g) => (
                    <option key={g.id_grupo} value={g.id_grupo}>{g.nombre_grupo}</option>
                  ))}
                </select>
                <Boton color="naranja" onClick={() => v.asignar(c.id_reporte)}>Asignar</Boton>
              </div>
            )}

            {c.asignado && (
              <p className="apoyo nota-campo">
                Asignado a {(grupos.datos ?? []).find((g) => String(g.id_grupo) === String(c.grupo))?.nombre_grupo}
              </p>
            )}
          </article>
        ))}

        <div className="pila-botones">
          <Boton color="blanco" onClick={salir}>Cerrar sesion</Boton>
        </div>
      </div>
    </div>
  );
}
