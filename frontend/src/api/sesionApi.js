/* Inicio de sesion.
   Mientras no exista el servicio de autenticacion, el rol se
   deduce del dominio del correo, tal como quedo documentado en
   la evidencia GA6-220501096-AA3/AA4-EV01. */
import { USUARIO, FUNCIONARIO } from '../data/datosDemo.js';
import { pedir } from './clienteDatos.js';

const ERROR_CREDENCIALES = 'El correo o la contrasena no son correctos. Revisa tus datos e intenta otra vez.';

/**
 * Valida las credenciales y devuelve el usuario de la sesion.
 * @param {string} correo
 * @param {string} clave
 */
export function iniciarSesion(correo, clave) {
  if (clave.length < 8) return pedir(null, { fallar: ERROR_CREDENCIALES });
  if (correo.endsWith('@alcaldia.gov.co')) return pedir({ ...FUNCIONARIO, correo });
  if (correo.endsWith('@correo.com')) return pedir({ ...USUARIO, correo });
  return pedir(null, { fallar: ERROR_CREDENCIALES });
}
