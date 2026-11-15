/* Consultas y acciones sobre los reportes.
   Las pantallas llaman estas funciones y no conocen de donde
   sale la informacion. */
import {
  REPORTES, POR_VERIFICAR, RESUMEN, RESUMEN_FUNCIONARIO, GRUPOS,
} from '../data/datosDemo.js';
import { pedir, SIMULAR_FALLO, ERROR_RED } from './clienteDatos.js';

const falla = () => (SIMULAR_FALLO ? { fallar: ERROR_RED } : {});

/** Reportes visibles en el mapa del municipio. */
export const listarReportes = () => pedir(REPORTES, falla());

/** Reportes enviados por un ciudadano. */
export const listarMisReportes = (idUsuario) =>
  pedir(REPORTES.filter((r) => r.id_usuario === idUsuario), falla());

/** Los tres reportes mas recientes, para la pantalla de inicio. */
export const listarRecientes = () => pedir(REPORTES.slice(0, 3), falla());

/** Un reporte por su identificador. Devuelve null si no existe. */
export const obtenerReporte = (id) =>
  pedir(REPORTES.find((r) => String(r.id_reporte) === String(id)) ?? null, falla());

/** Contadores del municipio. */
export const obtenerResumen = () => pedir(RESUMEN, falla());

/** Contadores del funcionario. */
export const obtenerResumenFuncionario = () => pedir(RESUMEN_FUNCIONARIO, falla());

/** Bandeja de reportes que el funcionario todavia no ha verificado. */
export const listarPorVerificar = () => pedir(POR_VERIFICAR, falla());

/** Grupos de limpieza disponibles. */
export const listarGrupos = () => pedir(GRUPOS, falla());

/* Estados en los que un reporte sigue abierto. Son los mismos
   de ck_reporte_estado que no corresponden a un caso cerrado. */
const ABIERTOS = ['recibido', 'en verificacion', 'programado', 'en ejecucion'];

/**
 * Crea un reporte.
 *
 * REGLA 1 del plan tecnico: un mismo ciudadano no puede tener dos
 * reportes abiertos en la misma direccion. En el backend esta regla
 * responde con 409 desde reporte.service.js. Aqui se comprueba antes
 * de enviar, para que el ciudadano se entere en el formulario y no
 * despues.
 */
export function crearReporte(datos) {
  const repetido = REPORTES.some(
    (r) => r.id_usuario === datos.id_usuario
      && r.direccion.trim().toLowerCase() === datos.direccion.trim().toLowerCase()
      && ABIERTOS.includes(r.estado),
  );
  if (repetido) {
    return pedir(null, {
      fallar: 'Ya tienes un reporte abierto en esta direccion. Revisa Mis reportes antes de enviar otro.',
    });
  }
  return pedir({ ...datos, id_reporte: REPORTES.length + 1, estado: 'recibido' });
}
