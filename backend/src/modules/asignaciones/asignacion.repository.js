const { pool } = require('../../config/database');

async function buscarGrupo(idGrupo) {
  const [filas] = await pool.query(
    `SELECT id_grupo, nombre_grupo, estado_grupo FROM grupo_limpieza WHERE id_grupo = ?`,
    [idGrupo]
  );
  return filas[0] || null;
}

async function buscarPorReporte(idReporte) {
  const [filas] = await pool.query(
    `SELECT id_asignacion, id_grupo, fecha_programada
       FROM asignacion
      WHERE id_reporte = ?
      ORDER BY id_asignacion DESC
      LIMIT 1`,
    [idReporte]
  );
  return filas[0] || null;
}

async function crear(datos, conexion = pool) {
  const [salida] = await conexion.query(
    `INSERT INTO asignacion
       (id_reporte, id_grupo, id_funcionario, fecha_programada, tiempo_estimado)
     VALUES (?, ?, ?, ?, ?)`,
    [
      datos.idReporte,
      datos.idGrupo,
      datos.idFuncionario,
      datos.fechaProgramada,
      datos.tiempoEstimado,
    ]
  );
  return salida.insertId;
}

module.exports = { buscarGrupo, buscarPorReporte, crear };
