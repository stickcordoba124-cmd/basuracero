import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contadores from '../components/Contadores.jsx';
import { POR_VERIFICAR, RESUMEN_FUNCIONARIO, FUNCIONARIO, GRUPOS } from '../data/datosDemo.js';

/* Flujo alterno del mapa de navegacion. Panel del funcionario.

   Las dos decisiones principales, aprobar o descartar, estan dentro
   de la misma tarjeta del reporte, sin cambiar de pantalla.
   El color de cada boton indica la consecuencia: verde para aprobar,
   blanco para descartar y naranja para asignar. */
export default function PanelFuncionario() {
  const navegar = useNavigate();
  const [casos, setCasos] = useState(
    POR_VERIFICAR.map((c) => ({ ...c, decision: null, grupo: '', asignado: false }))
  );
  const [aviso, setAviso] = useState('');

  function decidir(id, decision) {
    setCasos((cs) => cs.map((c) => (c.id_reporte === id ? { ...c, decision } : c)));
    setAviso(decision === 'aprobado'
      ? `Reporte ${id} aprobado. Ya puede asignar el grupo de limpieza.`
      : `Reporte ${id} descartado. Se notificara al ciudadano.`);
  }

  function cambiarGrupo(id, grupo) {
    setCasos((cs) => cs.map((c) => (c.id_reporte === id ? { ...c, grupo } : c)));
  }

  function asignar(id) {
    const caso = casos.find((c) => c.id_reporte === id);
    if (!caso.grupo) { setAviso('Elija primero el grupo de limpieza.'); return; }
    setCasos((cs) => cs.map((c) => (c.id_reporte === id ? { ...c, asignado: true } : c)));
    const nombre = GRUPOS.find((g) => String(g.id_grupo) === String(caso.grupo))?.nombre_grupo;
    setAviso(`Reporte ${id} asignado a ${nombre}. El estado pasa a programado.`);
  }

  const pendientes = casos.filter((c) => c.decision === null || !c.asignado);

  return (
    <div className="cuerpo" id="contenido">
      <header className="cabecera" style={{ paddingTop: 16, paddingBottom: 16 }}>
        <span className="avatar" aria-hidden="true">CR</span>
        <div>
          <h1 style={{ fontSize: 17 }}>{FUNCIONARIO.nombre}</h1>
          <p style={{ margin: 0, fontSize: 12, color: '#D6EEE0' }}>Funcionario de aseo municipal</p>
        </div>
      </header>

      <div className="seccion" style={{ paddingTop: 14 }}>
        <Contadores datos={RESUMEN_FUNCIONARIO} />

        <div aria-live="polite" role="status">
          {aviso && (
            <div className="aviso aviso-verde" style={{ marginTop: 14, marginBottom: 0 }}>
              <span aria-hidden="true">&#8505;</span>
              <div><p>{aviso}</p></div>
            </div>
          )}
        </div>

        <h2 className="titulo-seccion">Reportes por verificar</h2>

        {pendientes.length === 0 && (
          <p className="vacio">No quedan reportes por verificar.</p>
        )}

        {casos.map((c) => (
          <article key={c.id_reporte} className="tarjeta-verificar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span className={c.decision === 'descartado' ? 'etiqueta etiqueta-proceso' : 'etiqueta etiqueta-pendiente'}>
                {c.decision ? c.decision.toUpperCase() : 'PENDIENTE'}
              </span>
              <span className="apoyo">{c.hace}</span>
            </div>

            <h3 style={{ marginBottom: 2 }}>{c.titulo}</h3>
            <p className="tarjeta-lugar">{c.direccion}</p>

            {c.decision === null && (
              <div className="fila-acciones">
                <button type="button" className="boton boton-blanco"
                        onClick={() => decidir(c.id_reporte, 'descartado')}>
                  Descartar
                </button>
                <button type="button" className="boton boton-verde"
                        onClick={() => decidir(c.id_reporte, 'aprobado')}>
                  Aprobar
                </button>
              </div>
            )}

            {c.decision === 'aprobado' && !c.asignado && (
              <div className="fila-asignar">
                <label htmlFor={`grupo-${c.id_reporte}`} className="oculto-visual">
                  Grupo de limpieza para el reporte {c.id_reporte}
                </label>
                <select
                  id={`grupo-${c.id_reporte}`}
                  value={c.grupo}
                  onChange={(e) => cambiarGrupo(c.id_reporte, e.target.value)}
                >
                  <option value="">Elegir grupo de limpieza</option>
                  {GRUPOS.map((g) => (
                    <option key={g.id_grupo} value={g.id_grupo}>{g.nombre_grupo}</option>
                  ))}
                </select>
                <button type="button" className="boton boton-naranja"
                        onClick={() => asignar(c.id_reporte)}>
                  Asignar
                </button>
              </div>
            )}

            {c.asignado && (
              <p className="apoyo" style={{ marginTop: 10, marginBottom: 0 }}>
                Asignado a {GRUPOS.find((g) => String(g.id_grupo) === String(c.grupo))?.nombre_grupo}
              </p>
            )}
          </article>
        ))}

        <div style={{ marginTop: 16, marginBottom: 20 }}>
          <button type="button" className="boton boton-blanco" onClick={() => navegar('/login')}>
            Cerrar sesion
          </button>
        </div>
      </div>
    </div>
  );
}
