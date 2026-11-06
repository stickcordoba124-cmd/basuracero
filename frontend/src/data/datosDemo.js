/* ============================================================
   Datos de demostracion
   Evidencia GA6-220501096-AA3/AA4-EV01

   En esta etapa la interfaz todavia no se conecta a los
   servicios, asi que las pantallas se alimentan de este
   archivo. Los nombres de los campos y los valores permitidos
   son los mismos de la base de datos aprobada en la evidencia
   GA6-220501096-AA2-EV01, para que al conectar el backend no
   haya que renombrar nada.
   ============================================================ */

/* Las ocho categorias que acepta la restriccion ck_reporte_categoria */
export const CATEGORIAS = [
  { valor: 'organico', etiqueta: 'Organico' },
  { valor: 'inorganico', etiqueta: 'Inorganico' },
  { valor: 'escombro', etiqueta: 'Escombro' },
  { valor: 'peligroso', etiqueta: 'Peligroso' },
  { valor: 'vidrio', etiqueta: 'Vidrio' },
  { valor: 'plastico', etiqueta: 'Plastico' },
  { valor: 'electronico', etiqueta: 'Electronico' },
  { valor: 'mixto', etiqueta: 'Mixto' },
];

/* Los cinco niveles que acepta ck_reporte_nivel, de 1 a 5 */
export const NIVELES = [
  { valor: 1, etiqueta: '1 Leve' },
  { valor: 2, etiqueta: '2 Bajo' },
  { valor: 3, etiqueta: '3 Medio' },
  { valor: 4, etiqueta: '4 Alto' },
  { valor: 5, etiqueta: '5 Critico' },
];

/* Los cinco estados internos de ck_reporte_estado */
export const ESTADOS = [
  'recibido',
  'en verificacion',
  'programado',
  'en ejecucion',
  'cerrado',
];

/* El ciudadano no ve los cinco estados, ve tres etiquetas.
   Es la misma agrupacion de la consulta del RF.004. */
export function etiquetaDeEstado(estado) {
  if (estado === 'recibido' || estado === 'en verificacion') return 'Pendiente';
  if (estado === 'programado' || estado === 'en ejecucion') return 'En proceso';
  return 'Atendido';
}

export function claseDeEtiqueta(estado) {
  const e = etiquetaDeEstado(estado);
  if (e === 'Pendiente') return 'etiqueta etiqueta-pendiente';
  if (e === 'En proceso') return 'etiqueta etiqueta-proceso';
  return 'etiqueta etiqueta-atendido';
}

/* Usuario con el que entra la aplicacion.
   Corresponde al usuario 1 de los datos de prueba. */
export const USUARIO = {
  id_usuario: 1,
  nombre: 'Jefferson Murillo',
  correo: 'jefferson@correo.com',
  telefono: '3001112233',
  rol: 'ciudadano',
};

export const FUNCIONARIO = {
  id_usuario: 3,
  nombre: 'Carlos Ruiz',
  correo: 'carlos@alcaldia.gov.co',
  rol: 'funcionario',
};

export const GRUPOS = [
  { id_grupo: 1, nombre_grupo: 'Brigada Norte' },
  { id_grupo: 2, nombre_grupo: 'Brigada Sur' },
  { id_grupo: 3, nombre_grupo: 'Brigada Centro' },
];

export const REPORTES = [
  {
    id_reporte: 1,
    id_usuario: 1,
    autor: 'Jefferson Murillo',
    titulo: 'Escombros de demolicion',
    direccion: 'Calle 8 #7-98, brisas del rio',
    categoria_residuo: 'escombro',
    nivel_situacion: 4,
    estado: 'en ejecucion',
    fecha_creacion: '15 Oct, 2026',
    latitud: 4.533,
    longitud: -75.681,
    x: 28,
    y: 62,
    descripcion:
      'Escombros de remodelacion domiciliaria acumulados en el anden desde hace tres dias. Impiden el transito peatonal seguro y obligan a los vecinos a bajar a la calzada vehicular.',
    seguimiento: [
      { titulo: 'Reportado por ciudadano', fecha: '15 Oct, 2026 - 09:41', hecho: true },
      { titulo: 'En revision de viabilidad', fecha: '16 Oct, 2026 - 14:20', hecho: true },
      { titulo: 'En proceso de retiro programado', fecha: '18 Oct, 2026 - 08:30', hecho: true },
      { titulo: 'Resuelto y limpio', fecha: 'Pendiente', hecho: false },
    ],
  },
  {
    id_reporte: 2,
    id_usuario: 1,
    autor: 'Jefferson Murillo',
    titulo: 'Microbasurero clandestino',
    direccion: 'Av. General Bustamante 412',
    categoria_residuo: 'mixto',
    nivel_situacion: 3,
    estado: 'recibido',
    fecha_creacion: '08 Oct, 2026',
    latitud: 4.536,
    longitud: -75.678,
    x: 62,
    y: 30,
    descripcion:
      'Punto de arrojo clandestino en la esquina. Se acumulan bolsas durante la noche y en la manana quedan regadas por los animales.',
    seguimiento: [
      { titulo: 'Reportado por ciudadano', fecha: '08 Oct, 2026 - 18:05', hecho: true },
      { titulo: 'En revision de viabilidad', fecha: 'Pendiente', hecho: false },
      { titulo: 'Programado para retiro', fecha: 'Pendiente', hecho: false },
      { titulo: 'Resuelto y limpio', fecha: 'Pendiente', hecho: false },
    ],
  },
  {
    id_reporte: 3,
    id_usuario: 2,
    autor: 'Laura Gomez',
    titulo: 'Restos de poda organica',
    direccion: 'Pasaje Santa Filomena 24',
    categoria_residuo: 'organico',
    nivel_situacion: 2,
    estado: 'cerrado',
    fecha_creacion: '28 Sep, 2026',
    latitud: 4.531,
    longitud: -75.684,
    x: 44,
    y: 48,
    descripcion:
      'Ramas y hojas dejadas tras la poda de los arboles del parque. Ya fueron retiradas por la brigada.',
    seguimiento: [
      { titulo: 'Reportado por ciudadano', fecha: '28 Sep, 2026 - 07:15', hecho: true },
      { titulo: 'En revision de viabilidad', fecha: '28 Sep, 2026 - 11:40', hecho: true },
      { titulo: 'En proceso de retiro programado', fecha: '29 Sep, 2026 - 06:50', hecho: true },
      { titulo: 'Resuelto y limpio', fecha: '29 Sep, 2026 - 10:05', hecho: true },
    ],
  },
  {
    id_reporte: 4,
    id_usuario: 1,
    autor: 'Jefferson Murillo',
    titulo: 'Electrodomesticos botados',
    direccion: 'Carrera 7 #8-42, chapinero',
    categoria_residuo: 'electronico',
    nivel_situacion: 3,
    estado: 'cerrado',
    fecha_creacion: '14 Sep, 2026',
    latitud: 4.538,
    longitud: -75.676,
    x: 74,
    y: 70,
    descripcion:
      'Nevera y dos televisores abandonados en el separador de la via. Requieren manejo de residuo electronico.',
    seguimiento: [
      { titulo: 'Reportado por ciudadano', fecha: '14 Sep, 2026 - 16:22', hecho: true },
      { titulo: 'En revision de viabilidad', fecha: '15 Sep, 2026 - 09:10', hecho: true },
      { titulo: 'En proceso de retiro programado', fecha: '16 Sep, 2026 - 07:00', hecho: true },
      { titulo: 'Resuelto y limpio', fecha: '16 Sep, 2026 - 12:30', hecho: true },
    ],
  },
];

/* Bandeja del funcionario: los reportes que aun no se han verificado */
export const POR_VERIFICAR = [
  {
    id_reporte: 2,
    titulo: 'Microbasurero clandestino',
    direccion: 'Av. General Bustamante 412',
    hace: 'hace 2 h',
    estado: 'recibido',
  },
  {
    id_reporte: 5,
    titulo: 'Chatarra acumulada en el anden',
    direccion: 'Calle 7 #3-45, barrio Centro',
    hace: 'hace 4 h',
    estado: 'recibido',
  },
  {
    id_reporte: 6,
    titulo: 'Ramas de poda acumuladas',
    direccion: 'Carrera 7 #8-42, chapinero',
    hace: 'hace 6 h',
    estado: 'recibido',
  },
];

export const RESUMEN = { pendientes: 12, enProceso: 8, resueltos: 45 };
export const RESUMEN_FUNCIONARIO = { pendientes: 12, enProceso: 5, resueltos: 30 };
