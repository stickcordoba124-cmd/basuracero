require('dotenv').config();

/* Un solo lugar lee process.env. Asi, si manana cambia el nombre de una
   variable, se cambia aqui y no en veinte archivos regados. */
const env = {
  puerto: Number(process.env.PUERTO) || 4000,
  origenFrontend: process.env.ORIGEN_FRONTEND || 'http://localhost:5173',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PUERTO) || 3306,
    user: process.env.DB_USUARIO || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NOMBRE || 'basuracero',
  },
  jwtSecreto: process.env.JWT_SECRETO || '',
  jwtExpiracion: process.env.JWT_EXPIRACION || '8h',
};

/* Si falta el secreto el servidor no arranca. Es preferible que falle aqui,
   al encender, y no mas adelante cuando alguien intente iniciar sesion. */
if (!env.jwtSecreto) {
  throw new Error('Falta JWT_SECRETO en el archivo .env');
}

module.exports = env;
