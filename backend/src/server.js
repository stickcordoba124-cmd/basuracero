const app = require('./app');
const env = require('./config/env');
const { probarConexion } = require('./config/database');

async function encender() {
  try {
    await probarConexion();
    console.log('Conexion a MySQL correcta.');
  } catch (error) {
    console.error('No se pudo conectar a MySQL. Revise el archivo .env.');
    console.error(error.message);
    process.exit(1);
  }

  app.listen(env.puerto, () => {
    console.log('API de BasuraCero escuchando en http://localhost:' + env.puerto);
  });
}

encender();
