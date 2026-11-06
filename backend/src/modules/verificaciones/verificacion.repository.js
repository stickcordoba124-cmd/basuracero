const { pool } = require('../../config/database');

async function buscarUltimaDelReporte(idReporte) {
  const [filas] = await pool.query(
    `SELECT id_verificacion, resultado, fecha_verificacion
       FROM verificacion
      WHERE id_reporte = ?
      ORDER BY fecha_verificacion DESC, id_verificacion DESC
      LIMIT 1`,
    [idReporte]
  );
  return filas[0] || null;
}

async function crear({ idReporte, idFuncionario, resultado, observacion }, conexion = pool) {
  const [salida] = await conexion.query(
    `INSERT INTO verificacion (id_reporte, id_funcionario, resultado, observacion)
     VALUES (?, ?, ?, ?)`,
    [idReporte, idFuncionario, resultado, observacion || null]
  );
  return salida.insertId;
}

module.exports = { buscarUltimaDelReporte, crear };
