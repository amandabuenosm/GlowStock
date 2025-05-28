const express = require('express');
const rota = express.Router();
const funcController = require('../controllers/usuariosController');

rota.get('/', funcController.listarusuario);
rota.get('/:id', funcController.buscapeloid);
rota.post('/login', funcController.buscalogin);
rota.post('/', funcController.criarusuario);
rota.put('/:id', funcController.editarusuario);
rota.put('/:id', funcController.trocarstatus);
rota.delete('/:id', funcController.deletarusuario);

module.exports = rota;
