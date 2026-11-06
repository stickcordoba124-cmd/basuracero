/* Prepara el archivo .env la primera vez que se ejecuta el proyecto.

   Se hace con un script y no a mano porque el secreto del token tiene que
   ser distinto en cada equipo. Si se dejara escrito en el repositorio,
   cualquiera que lo clone podria firmar tokens validos. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CARPETA = path.join(__dirname, '..');
const RUTA_ENV = path.join(CARPETA, '.env');
const RUTA_EJEMPLO = path.join(CARPETA, '.env.example');

const OBLIGATORIAS = ['DB_PASSWORD', 'SEMILLA_PASSWORD'];

function leerValor(texto, clave) {
  const linea = texto.split(/\r?\n/).find((l) => l.startsWith(clave + '='));
  return linea ? linea.slice(clave.length + 1).trim() : '';
}

function avisarYSalir() {
  console.log('');
  console.log('  FALTA LLENAR EL ARCHIVO backend\\.env');
  console.log('');
  console.log('  Abralo con el Bloc de notas y escriba:');
  console.log('    DB_PASSWORD        su contrasena de MySQL');
  console.log('    SEMILLA_PASSWORD   una clave de prueba, 8 caracteres o mas');
  console.log('');
  console.log('  Guarde el archivo y vuelva a ejecutar INICIAR_BACKEND.bat');
  console.log('');
  process.exit(1);
}

if (!fs.existsSync(RUTA_ENV)) {
  const secreto = crypto.randomBytes(32).toString('hex');
  const contenido = fs
    .readFileSync(RUTA_EJEMPLO, 'utf8')
    .replace(/^JWT_SECRETO=.*$/m, 'JWT_SECRETO=' + secreto);
  fs.writeFileSync(RUTA_ENV, contenido);
  console.log('Se creo el archivo .env con un secreto nuevo para los tokens.');
  avisarYSalir();
}

const texto = fs.readFileSync(RUTA_ENV, 'utf8');
const faltantes = OBLIGATORIAS.filter((clave) => leerValor(texto, clave) === '');
if (faltantes.length > 0) {
  avisarYSalir();
}

console.log('El archivo .env esta completo.');
