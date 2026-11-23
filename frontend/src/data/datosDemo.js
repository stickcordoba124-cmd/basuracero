/* ============================================================
   Datos de demostracion
   Evidencia GA6-220501096-AA3/AA4-EV01

   En esta etapa la interfaz todavia no se conecta a los
   servicios, asi que las pantallas se alimentan de este
   archivo. Los nombres de los campos y los valores permitidos
   son los mismos de la base de datos aprobada en la evidencia
   GA6-220501096-AA2-EV01, para que al conectar el backend no
   haya que renombrar nada.

   CASOS QUE CUBREN ESTOS DATOS
   Caso normal: los reportes 1, 2, 3 y 4, con los tres estados que
   ve el ciudadano y categorias distintas.
   Caso limite: el reporte 7, con nivel 5 critico, el mas alto que
   acepta ck_reporte_nivel, y la descripcion en el maximo de 500
   caracteres que permite el campo.
   Caso de error: el reporte 1 esta abierto en la misma direccion
   que trae por defecto el formulario de nuevo reporte, asi que al
   enviarlo sin cambiar la direccion se dispara la REGLA 1 y se ve
   el mensaje de error del formulario.
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
  /* CASO LIMITE. Nivel 5, el mas alto de ck_reporte_nivel, con la
     descripcion en el tope de 500 caracteres del campo. Sirve para
     comprobar que el texto largo no rompe la tarjeta ni el detalle. */
  {
    id_reporte: 7,
    id_usuario: 1,
    autor: 'Jefferson Murillo',
    titulo: 'Residuos hospitalarios a cielo abierto',
    direccion: 'Carrera 12 #4-10, salida al matadero',
    categoria_residuo: 'peligroso',
    nivel_situacion: 5,
    estado: 'en verificacion',
    fecha_creacion: '18 Nov, 2026',
    latitud: 4.529,
    longitud: -75.689,
    x: 16,
    y: 22,
    descripcion:
      'Bolsas rojas de residuos hospitalarios abandonadas en el lote baldio que queda a la salida del matadero municipal, al lado de la via por donde pasan los ninos del colegio. Hay jeringas y material de curacion a la vista, sin ninguna señalizacion y sin cerramiento. Los perros de la zona rompen las bolsas durante la noche y dejan el material regado sobre el anden y la calzada. Los vecinos llevan tres dias llamando a la linea de la alcaldia y nadie ha venido. Se necesita manejo especial de residuo peligroso, no el camion de basura comun, y se recomienda cerrar el paso mientras llega la brigada.',
    seguimiento: [
      { titulo: 'Reportado por ciudadano', fecha: '18 Nov, 2026 - 06:12', hecho: true },
      { titulo: 'En revision de viabilidad', fecha: '18 Nov, 2026 - 09:30', hecho: true },
      { titulo: 'Programado para retiro', fecha: 'Pendiente', hecho: false },
      { titulo: 'Resuelto y limpio', fecha: 'Pendiente', hecho: false },
    ],
  },
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
