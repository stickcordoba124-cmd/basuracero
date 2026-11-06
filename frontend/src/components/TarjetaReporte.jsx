import { useNavigate } from 'react-router-dom';
import EtiquetaEstado from './EtiquetaEstado.jsx';

/* Tarjeta de un reporte. Toda la tarjeta es el area de toque,
   para que acertar sea facil, y la etiqueta de estado queda
   siempre en la misma posicion para que la lectura sea predecible. */
export default function TarjetaReporte({ reporte, mostrarFecha = false }) {
  const navegar = useNavigate();
  return (
    <button
      type="button"
      className="tarjeta"
      onClick={() => navegar(`/detalle/${reporte.id_reporte}`)}
      aria-label={`Abrir el reporte ${reporte.titulo}, estado ${reporte.estado}`}
    >
      <span className="tarjeta-foto" aria-hidden="true" />
      <span className="tarjeta-texto">
        <EtiquetaEstado estado={reporte.estado} />
        <span className="tarjeta-titulo">{reporte.titulo}</span>
        <span className="tarjeta-lugar">
          {mostrarFecha ? reporte.fecha_creacion : reporte.direccion}
        </span>
      </span>
      <span aria-hidden="true" style={{ color: '#9AA8B0' }}>&#8250;</span>
    </button>
  );
}
