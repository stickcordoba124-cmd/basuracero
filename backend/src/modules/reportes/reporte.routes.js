const { Router } = require('express');
const controlador = require('./reporte.controller');
const autenticar = require('../../shared/middlewares/autenticar');
const autorizar = require('../../shared/middlewares/autorizar');
const validarCampos = require('../../shared/middlewares/validarCampos');

const rutas = Router();

/* Consultar el mapa lo puede hacer cualquier rol autenticado, como dice
   el RF.004. Crear un reporte solo el ciudadano. */
rutas.get('/', autenticar, controlador.listar);

rutas.post(
  '/',
  autenticar,
  autorizar('ciudadano'),
  validarCampos({
    obligatorios: ['fotoUrl', 'latitud', 'longitud', 'direccion', 'categoriaResiduo', 'nivelSituacion'],
  }),
  controlador.crear
);

module.exports = rutas;
