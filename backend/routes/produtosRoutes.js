/** definir rotas da API */

const express = require('express');
const rota = express.Router();
const funcController = require('../controllers/produtosController');

rota.get('/listadeprodutos', funcController.listarprod);
rota.get('/produtos/:id', funcController.buscapeloid);
rota.post('/produtos', funcController.criarprod);
rota.put('/produtos/:id', funcController.editaritem);
rota.delete('/produtos/:id', funcController.deletaritem);

module.exports = rota;

// adicionar documentação Swagger