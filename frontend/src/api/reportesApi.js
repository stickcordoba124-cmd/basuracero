/* Consultas y acciones sobre los reportes.
   Las pantallas llaman estas funciones y no conocen de donde
   sale la informacion.

   Mientras no exista el servidor, los reportes viven en la lista
   de abajo. Arranca con los datos de prueba y los reportes nuevos
   se agregan ahi, para que al enviar uno se vea de una en el mapa
   y en el historial. Se pierden al recargar la pagina, porque no
   hay base de datos todavia: eso lo resuelve el backend. */
import {
  REPORTES, POR_VERIFICAR, RESUMEN, RESUMEN_FUNCIONARIO, GRUPOS, CATEGORIAS,
} from '../data/datosDemo.js';
import { pedir, SIMULAR_FALLO, ERROR_RED } from './clienteDatos.js';

const falla = () => (SIMULAR_FALLO ? { fallar: ERROR_RED } : {});

/* Copia de trabajo. No se toca el archivo de datos de prueba. */
const reportes = [...REPORTES];

/** Reportes visibles en el mapa del municipio. */
export const listarReportes = () => pedir([...reportes], falla());

/** Reportes enviados por un ciudadano. */
export const listarMisReportes = (idUsuario) =>
  pedir(reportes.filter((r) => r.id_usuario === idUsuario), falla());

/** Los tres reportes mas recientes, para la pantalla de inicio. */
export const listarRecientes = () => pedir(reportes.slice(0, 3), falla());

/** Un reporte por su identificador. Devuelve null si no existe. */
export const obtenerReporte = (id) =>
  pedir(reportes.find((r) => String(r.id_reporte) === String(id)) ?? null, falla());

/** Contadores del municipio. Los pendientes suben con cada reporte nuevo. */
export const obtenerResumen = () =>
  pedir({ ...RESUMEN, pendientes: RESUMEN.pendientes + nuevos }, falla());

/** Contadores del funcionario. */
export const obtenerResumenFuncionario = () =>
  pedir({ ...RESUMEN_FUNCIONARIO, pendientes: RESUMEN_FUNCIONARIO.pendientes + nuevos }, falla());

/* Bandeja del funcionario. Son los reportes que todavia estan en
   estado recibido, o sea los que nadie ha verificado. Los que llegan
   durante la sesion entran de primeros, porque son los mas nuevos.
   Es lo que pide el RF.006: el funcionario confirma o descarta lo
   que va entrando. */
export const listarPorVerificar = () => {
  const recientes = reportes
    .filter((r) => r.estado === 'recibido' && r.id_reporte > 100)
    .map((r) => ({
      id_reporte: r.id_reporte,
      titulo: r.titulo,
      direccion: r.direccion,
      hace: 'hace un momento',
      estado: r.estado,
    }));
  return pedir([...recientes, ...POR_VERIFICAR], falla());
};

/** Grupos de limpieza disponibles. */
export const listarGrupos = () => pedir(GRUPOS, falla());

/* Estados en los que un reporte sigue abierto. Son los mismos
   de ck_reporte_estado que no corresponden a un caso cerrado. */
const ABIERTOS = ['recibido', 'en verificacion', 'programado', 'en ejecucion'];

let nuevos = 0;

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function fechaDeHoy() {
  const h = new Date();
  return `${String(h.getDate()).padStart(2, '0')} ${MESES[h.getMonth()]}, ${h.getFullYear()}`;
}

/* Titulo automatico a partir de la categoria. El formulario no pide
   titulo, y en la base de datos tampoco existe esa columna: la lista
   lo arma con la categoria, igual que la consulta del RF.004. */
function tituloDe(categoria) {
  const etiqueta = CATEGORIAS.find((c) => c.valor === categoria)?.etiqueta ?? 'Residuo';
  return `Punto de ${etiqueta.toLowerCase()} reportado`;
}

/**
 * Crea un reporte.
 *
 * REGLA 1 del plan tecnico: un mismo ciudadano no puede tener dos
 * reportes abiertos en la misma direccion. En el backend esta regla
 * responde con 409 desde reporte.service.js. Aqui se comprueba antes
 * de enviar, para que el ciudadano se entere en el formulario y no
 * despues.
 *
 * La regla es por ciudadano, no por punto. Si otro vecino reporta la
 * misma direccion, el reporte entra: el RF.006 le deja al funcionario
 * la tarea de confirmar o descartar los repetidos.
 */
export function crearReporte(datos) {
  const repetido = reportes.some(
    (r) => r.id_usuario === datos.id_usuario
      && r.direccion.trim().toLowerCase() === datos.direccion.trim().toLowerCase()
      && ABIERTOS.includes(r.estado),
  );
  if (repetido) {
    return pedir(null, {
      fallar: 'Ya tienes un reporte abierto en esta direccion. Revisa Mis reportes antes de enviar otro.',
    });
  }

  nuevos += 1;
  const fecha = fechaDeHoy();
  const reporte = {
    id_reporte: 100 + nuevos,
    id_usuario: datos.id_usuario,
    autor: datos.autor,
    titulo: tituloDe(datos.categoria),
    direccion: datos.direccion.trim(),
    categoria_residuo: datos.categoria,
    nivel_situacion: datos.nivel,
    estado: 'recibido',
    fecha_creacion: fecha,
    latitud: null,
    longitud: null,
    /* Posicion en el lienzo del mapa. Se reparte para que los
       reportes nuevos no caigan todos en el mismo punto. */
    x: 20 + ((nuevos * 23) % 60),
    y: 20 + ((nuevos * 31) % 60),
    descripcion: datos.descripcion.trim(),
    seguimiento: [
      { titulo: 'Reportado por ciudadano', fecha, hecho: true },
      { titulo: 'En revision de viabilidad', fecha: 'Pendiente', hecho: false },
      { titulo: 'Programado para retiro', fecha: 'Pendiente', hecho: false },
      { titulo: 'Resuelto y limpio', fecha: 'Pendiente', hecho: false },
    ],
  };

  reportes.unshift(reporte);
  return pedir(reporte);
}
