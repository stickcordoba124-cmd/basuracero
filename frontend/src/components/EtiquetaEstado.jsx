import { etiquetaDeEstado, claseDeEtiqueta } from '../data/datosDemo.js';

/* Etiqueta de estado. Ningun estado se comunica solo con color:
   siempre lleva su palabra, como se justifico en el prototipo. */
export default function EtiquetaEstado({ estado }) {
  return <span className={claseDeEtiqueta(estado)}>{etiquetaDeEstado(estado).toUpperCase()}</span>;
}
