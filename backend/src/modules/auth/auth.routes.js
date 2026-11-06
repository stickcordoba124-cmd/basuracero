const { Router } = require('express');
const controlador = require('./auth.controller');
const validarCampos = require('../../shared/middlewares/validarCampos');

const rutas = Router();

rutas.post(
  '/iniciar-sesion',
  validarCampos({ obligatorios: ['correo', 'contrasena'] }),
  controlador.iniciarSesion
);

module.exports = rutas;
