const mysql = require('mysql2/promise');
const env = require('./env');

/* Un pool y no una conexion suelta: el pool reutiliza conexiones abiertas
   en vez de abrir y cerrar una por cada consulta, que es lo que termina
   tumbando el servidor cuando entran varias peticiones al tiempo.
   Ningun otro archivo del proyecto crea conexiones a MySQL. */
const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
});

async function probarConexion() {
  const conexion = await pool.getConnection();
  await conexion.ping();
  conexion.release();
}

module.exports = { pool, probarConexion };
