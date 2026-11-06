const { Router } = require('express');
const controlador = require('./asignacion.controller');
const autenticar = require('../../shared/middlewares/autenticar');
const autorizar = require('../../shared/middlewares/autorizar');
const validarCampos = require('../../shared/middlewares/validarCampos');

const rutas = Router();

rutas.post(
  '/:id/asignacion',
  autenticar,
  autorizar('funcionario', 'coordinador'),
  validarCampos({ obligatorios: ['idGrupo', 'fechaProgramada', 'tiempoEstimado'] }),
  controlador.asignar
);

module.exports = rutas;
