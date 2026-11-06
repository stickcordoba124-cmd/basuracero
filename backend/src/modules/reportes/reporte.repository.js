const { pool } = require('../../config/database');

const ESTADOS_ABIERTOS = ['recibido', 'en verificacion', 'programado', 'en ejecucion'];

async function listar({ estado, categoria }) {
  const condiciones = [];
  const valores = [];

  if (estado) {
    condiciones.push('r.estado = ?');
    valores.push(estado);
  }
  if (categoria) {
    condiciones.push('r.categoria_residuo = ?');
    valores.push(categoria);
  }

  const donde = condiciones.length > 0 ? 'WHERE ' + condiciones.join(' AND ') : '';

  const [filas] = await pool.query(
    `SELECT r.id_reporte, r.direccion, r.latitud, r.longitud, r.categoria_residuo,
            r.nivel_situacion, r.estado, r.fecha_creacion, u.nombre AS ciudadano
       FROM reporte r
       JOIN usuario u ON u.id_usuario = r.id_usuario
       ${donde}
      ORDER BY r.fecha_creacion DESC`,
    valores
  );
  return filas;
}

async function buscarPorId(idReporte) {
  const [filas] = await pool.query(`SELECT * FROM reporte WHERE id_reporte = ?`, [idReporte]);
  return filas[0] || null;
}

async function buscarAbiertoEnDireccion(idUsuario, direccion) {
  const marcadores = ESTADOS_ABIERTOS.map(() => '?').join(', ');
  const [filas] = await pool.query(
    `SELECT id_reporte
       FROM reporte
      WHERE id_usuario = ?
        AND direccion  = ?
        AND estado IN (${marcadores})
      LIMIT 1`,
    [idUsuario, direccion, ...ESTADOS_ABIERTOS]
  );
  return filas[0] || null;
}

async function crear(datos) {
  const [resultado] = await pool.query(
    `INSERT INTO reporte
       (id_usuario, foto_url, latitud, longitud, direccion,
        categoria_residuo, nivel_situacion)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      datos.idUsuario,
      datos.fotoUrl,
      datos.latitud,
      datos.longitud,
      datos.direccion,
      datos.categoriaResiduo,
      datos.nivelSituacion,
    ]
  );
  return resultado.insertId;
}

async function cambiarEstado(idReporte, estado, conexion = pool) {
  await conexion.query(`UPDATE reporte SET estado = ? WHERE id_reporte = ?`, [estado, idReporte]);
}

module.exports = {
  ESTADOS_ABIERTOS,
  listar,
  buscarPorId,
  buscarAbiertoEnDireccion,
  crear,
  cambiarEstado,
};
