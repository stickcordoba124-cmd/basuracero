const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const env = require('./config/env');
const manejadorErrores = require('./shared/middlewares/manejadorErrores');

const authRutas = require('./modules/auth/auth.routes');
const reporteRutas = require('./modules/reportes/reporte.routes');
const verificacionRutas = require('./modules/verificaciones/verificacion.routes');
const asignacionRutas = require('./modules/asignaciones/asignacion.routes');

/* app.js solo configura Express. Quien abre el puerto es server.js.
   Separarlos permite probar la aplicacion sin levantar un servidor. */
const app = express();

app.use(helmet());
app.use(cors({ origin: env.origenFrontend }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/v1/salud', (peticion, respuesta) =>
  respuesta.status(200).json({ exito: true, mensaje: 'La API esta arriba.' })
);

app.use('/api/v1/auth', authRutas);
app.use('/api/v1/reportes', reporteRutas);
app.use('/api/v1/reportes', verificacionRutas);
app.use('/api/v1/reportes', asignacionRutas);

app.use((peticion, respuesta) =>
  respuesta.status(404).json({ exito: false, mensaje: 'El recurso solicitado no existe.' })
);

app.use(manejadorErrores);

module.exports = app;
