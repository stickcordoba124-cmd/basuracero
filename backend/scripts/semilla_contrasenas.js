/* Pone una contrasena real, con hash de bcrypt, a los usuarios de prueba
   que trae 02_datos.sql, porque alli quedaron con un hash de relleno.
   Solo sirve para el entorno de desarrollo.
   El valor se lee de SEMILLA_PASSWORD en el archivo .env. */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('../src/config/database');

const COSTO = 10;

async function principal() {
  const clave = process.env.SEMILLA_PASSWORD;
  if (!clave || clave.length < 8) {
    console.error('Escriba SEMILLA_PASSWORD en el archivo .env, de 8 caracteres o mas.');
    process.exit(1);
  }

  const hash = await bcrypt.hash(clave, COSTO);
  const [resultado] = await pool.query('UPDATE usuario SET contrasena = ?', [hash]);
  console.log('Usuarios actualizados: ' + resultado.affectedRows);
  await pool.end();
}

principal();
