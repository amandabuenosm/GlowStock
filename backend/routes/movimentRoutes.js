const express = require("express");
const rota = express.Router();
const funcController = require('../controllers/movimentController');

rota.get("/", funcController.listarmovimentacoes);
rota.get("/produto/:nomeProd", funcController.movporproduto);
rota.post("/", funcController.armazenamentomovs);

module.exports = rota;
