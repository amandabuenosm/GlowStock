const express = require('express');
const rota = express.Router();
const funcController = require('../controllers/produtosController');

rota.get('/', funcController.listarprod);
rota.get('/:id', funcController.buscapeloid);
rota.post('/', funcController.criarprod);
rota.put('/:id', funcController.editaritem);
rota.delete('/:id', funcController.deletaritem);

module.exports = rota;
