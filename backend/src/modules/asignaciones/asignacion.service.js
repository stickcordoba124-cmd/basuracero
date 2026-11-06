const { pool } = require('../../config/database');
const AppError = require('../../shared/errors/AppError');
const repositorio = require('./asignacion.repository');
const reporteRepositorio = require('../reportes/reporte.repository');
const verificacionRepositorio = require('../verificaciones/verificacion.repository');

/**
 * RF.007 Asignacion a grupos de limpieza.
 * @param {number} idFuncionario - Funcionario que asigna.
 * @param {number} idReporte - Reporte que se va a atender.
 * @param {object} datos - Grupo, fecha programada y tiempo estimado.
 * @returns {object} La asignacion creada y el nuevo estado del reporte.
 */
async function asignar(idFuncionario, idReporte, datos) {
  const reporte = await reporteRepositorio.buscarPorId(idReporte);
  if (!reporte) {
    throw new AppError('El reporte no existe.', 404);
  }
  if (reporte.estado === 'cerrado') {
    throw new AppError('El reporte ya esta cerrado y no admite cambios.', 409);
  }

  /* REGLA 3. No se manda una brigada a un punto que nadie ha verificado.
     Mover una cuadrilla cuesta transporte, herramienta y jornada, y un
     reporte sin verificar puede estar repetido o estar mal ubicado. Por eso
     la asignacion exige que exista una verificacion previa con resultado
     valido, no basta con que el reporte este creado. */
  const verificacion = await verificacionRepositorio.buscarUltimaDelReporte(idReporte);
  if (!verificacion || verificacion.resultado !== 'valido') {
    throw new AppError(
      'El reporte debe estar verificado como valido antes de asignar una brigada.',
      409
    );
  }

  const yaAsignado = await repositorio.buscarPorReporte(idReporte);
  if (yaAsignado) {
    throw new AppError('El reporte ya tiene una brigada asignada.', 409);
  }

  const grupo = await repositorio.buscarGrupo(Number(datos.idGrupo));
  if (!grupo) {
    throw new AppError('El grupo de limpieza no existe.', 404);
  }
  if (grupo.estado_grupo !== 1) {
    throw new AppError('El grupo de limpieza esta inactivo.', 409);
  }

  const tiempoEstimado = Number(datos.tiempoEstimado);
  if (!Number.isInteger(tiempoEstimado) || tiempoEstimado <= 0) {
    throw new AppError('El tiempo estimado debe ser un numero de minutos mayor que cero.', 400);
  }

  const fechaProgramada = new Date(datos.fechaProgramada);
  if (Number.isNaN(fechaProgramada.getTime())) {
    throw new AppError('La fecha programada no es una fecha valida.', 400);
  }
  if (fechaProgramada.getTime() < Date.now()) {
    throw new AppError('La fecha programada no puede quedar en el pasado.', 400);
  }

  const conexion = await pool.getConnection();
  try {
    await conexion.beginTransaction();

    const idAsignacion = await repositorio.crear(
      {
        idReporte,
        idGrupo: grupo.id_grupo,
        idFuncionario,
        fechaProgramada: fechaProgramada.toISOString().slice(0, 19).replace('T', ' '),
        tiempoEstimado,
      },
      conexion
    );

    await reporteRepositorio.cambiarEstado(idReporte, 'programado', conexion);

    await conexion.commit();
    return {
      idAsignacion,
      idReporte,
      grupo: grupo.nombre_grupo,
      estadoReporte: 'programado',
    };
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
}

module.exports = { asignar };
