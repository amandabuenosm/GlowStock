const express = require("express");
const rota = express.Router();
const funcController = require('../controllers/movimentController');

rota.get("/:idProd", funcController.movporproduto);
rota.post("/", funcController.c);

module.exports = rota;
