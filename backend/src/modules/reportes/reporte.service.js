const AppError = require('../../shared/errors/AppError');
const repositorio = require('./reporte.repository');

/* Los valores permitidos son los mismos que acepta la base de datos
   en ck_reporte_categoria y ck_reporte_nivel. Se validan aqui ademas
   de en la base para poder devolver un mensaje entendible al ciudadano
   en lugar del error crudo de MySQL. */
const CATEGORIAS = [
  'organico',
  'inorganico',
  'escombro',
  'peligroso',
  'vidrio',
  'plastico',
  'electronico',
  'mixto',
];
const NIVEL_MINIMO = 1;
const NIVEL_MAXIMO = 5;
const LARGO_MINIMO_DIRECCION = 5;

/* RF.004 Visualizacion del mapa de reportes. */
async function listar(filtros) {
  return repositorio.listar(filtros);
}

/**
 * RF.003 Envio de reporte ciudadano.
 * @param {number} idUsuario - Ciudadano autenticado que envia el reporte.
 * @param {object} datos - Foto, coordenadas, direccion, categoria y nivel.
 * @returns {object} El reporte recien creado.
 */
async function crear(idUsuario, datos) {
  const direccion = String(datos.direccion || '').trim();

  if (direccion.length < LARGO_MINIMO_DIRECCION) {
    throw new AppError('Escriba una direccion mas completa.', 400);
  }
  if (!CATEGORIAS.includes(datos.categoriaResiduo)) {
    throw new AppError('La categoria de residuo no es valida.', 400);
  }

  const nivel = Number(datos.nivelSituacion);
  if (!Number.isInteger(nivel) || nivel < NIVEL_MINIMO || nivel > NIVEL_MAXIMO) {
    throw new AppError('El nivel de la situacion debe estar entre 1 y 5.', 400);
  }

  /* REGLA 1. Un mismo ciudadano no puede tener dos reportes abiertos en la
     misma direccion. El RF.006 obliga al funcionario a descartar reportes
     repetidos, y cada repetido le cuesta una visita de verificacion. Es mas
     barato impedirlo al enviar que pagarlo despues en campo. */
  const abiertoPrevio = await repositorio.buscarAbiertoEnDireccion(idUsuario, direccion);
  if (abiertoPrevio) {
    throw new AppError(
      'Ya tiene un reporte abierto en esa direccion. Puede seguirlo desde Mis reportes.',
      409
    );
  }

  const idReporte = await repositorio.crear({
    idUsuario,
    fotoUrl: datos.fotoUrl,
    latitud: datos.latitud,
    longitud: datos.longitud,
    direccion,
    categoriaResiduo: datos.categoriaResiduo,
    nivelSituacion: nivel,
  });

  return repositorio.buscarPorId(idReporte);
}

module.exports = { CATEGORIAS, listar, crear };
