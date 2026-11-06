const { pool } = require('../../config/database');

/* Solo ejecuta SQL. No decide reglas ni valida permisos.
   Todas las consultas van parametrizadas con ?, nunca concatenadas. */
async function buscarPorCorreo(correo) {
  const [filas] = await pool.query(
    `SELECT id_usuario, nombre, correo, contrasena, rol, estado
       FROM usuario
      WHERE correo = ?`,
    [correo]
  );
  return filas[0] || null;
}

module.exports = { buscarPorCorreo };
