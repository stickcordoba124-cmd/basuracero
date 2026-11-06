const { Router } = require('express');
const controlador = require('./verificacion.controller');
const autenticar = require('../../shared/middlewares/autenticar');
const autorizar = require('../../shared/middlewares/autorizar');
const validarCampos = require('../../shared/middlewares/validarCampos');

const rutas = Router();

/* La accion no es un CRUD, por eso va como subrecurso del reporte
   y no como un verbo en la raiz de la direccion. */
rutas.post(
  '/:id/verificacion',
  autenticar,
  autorizar('funcionario', 'coordinador', 'administrador'),
  validarCampos({ obligatorios: ['resultado'], opcionales: ['observacion'] }),
  controlador.verificar
);

module.exports = rutas;
