import { useState } from 'react';
import BarraInferior from '../components/BarraInferior.jsx';
import TarjetaReporte from '../components/TarjetaReporte.jsx';
import { REPORTES, USUARIO, etiquetaDeEstado } from '../data/datosDemo.js';

/* Nivel 2, modulo 3. Historial personal del ciudadano.
   Los filtros por estado evitan revisar toda la lista cuando
   solo interesa lo que sigue pendiente. */
const FILTROS = ['Todos', 'Pendiente', 'En proceso', 'Atendido'];

export default function MisReportes() {
  const [filtro, setFiltro] = useState('Todos');
  const mios = REPORTES.filter((r) => r.id_usuario === USUARIO.id_usuario);
  const visibles = filtro === 'Todos'
    ? mios
    : mios.filter((r) => etiquetaDeEstado(r.estado) === filtro);

  return (
    <>
      <div className="cuerpo" id="contenido">
        <header className="cabecera cabecera-oscura">
          <h1>Mis reportes</h1>
        </header>

        <div className="seccion" style={{ paddingTop: 14 }}>
          <div className="pildoras" role="group" aria-label="Filtrar mis reportes por estado">
            {FILTROS.map((f) => (
              <button
                key={f} type="button" className="pildora pildora-oscura"
                aria-pressed={filtro === f} onClick={() => setFiltro(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            {visibles.map((r) => <TarjetaReporte key={r.id_reporte} reporte={r} mostrarFecha />)}
            {visibles.length === 0 && <p className="vacio">No tienes reportes en ese estado.</p>}
          </div>

          <div className="aviso aviso-verde" style={{ marginTop: 6 }}>
            <span aria-hidden="true">&#9825;</span>
            <div>
              <strong>Gracias por cuidar tu comunidad</strong>
              <p>Cada reporte ayuda a tener un barrio mas limpio.</p>
            </div>
          </div>
        </div>
      </div>
      <BarraInferior />
    </>
  );
}
