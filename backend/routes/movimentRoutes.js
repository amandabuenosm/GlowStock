const express = require("express");
const rota = express.Router();
const funcController = require('../controllers/movimentController');

rota.get("/:idProd", funcController.movporproduto);
rota.post("/", funcController.armazenamentomovs);

module.exports = rota;
