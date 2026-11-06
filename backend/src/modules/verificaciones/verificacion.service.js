const { pool } = require('../../config/database');
const AppError = require('../../shared/errors/AppError');
const repositorio = require('./verificacion.repository');
const reporteRepositorio = require('../reportes/reporte.repository');

const RESULTADOS = ['valido', 'descartado'];

/**
 * RF.006 Verificacion del reporte.
 * El funcionario confirma o descarta un reporte recibido.
 */
async function verificar(idFuncionario, idReporte, resultado, observacion) {
  if (!RESULTADOS.includes(resultado)) {
    throw new AppError('El resultado debe ser valido o descartado.', 400);
  }

  const reporte = await reporteRepositorio.buscarPorId(idReporte);
  if (!reporte) {
    throw new AppError('El reporte no existe.', 404);
  }

  /* REGLA 2. Un reporte cerrado no se vuelve a tocar. El caso ya se atendio
     y tiene su intervencion registrada con fotos de antes y despues. Permitir
     verificarlo otra vez dejaria el historial del barrio contando un cuento
     distinto al que ocurrio en la calle. */
  if (reporte.estado === 'cerrado') {
    throw new AppError('El reporte ya esta cerrado y no admite cambios.', 409);
  }

  const conexion = await pool.getConnection();
  try {
    /* Las dos escrituras van juntas: si falla el cambio de estado, la
       verificacion tampoco queda guardada. */
    await conexion.beginTransaction();

    const idVerificacion = await repositorio.crear(
      { idReporte, idFuncionario, resultado, observacion },
      conexion
    );

    const nuevoEstado = resultado === 'valido' ? 'en verificacion' : 'cerrado';
    await reporteRepositorio.cambiarEstado(idReporte, nuevoEstado, conexion);

    await conexion.commit();
    return { idVerificacion, idReporte, resultado, estadoReporte: nuevoEstado };
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
}

module.exports = { RESULTADOS, verificar };
