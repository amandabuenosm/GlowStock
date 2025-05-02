const funcModelMov = require('../models/movimentModel');

const controllerMov = {
    movporproduto: (req, res) => {
        const idProd = req.params.idProd;
        funcModelMov.movporproduto(idProd, (err, results) => {
            if (err) {
                return res.status(500).json({ erro: "Erro na busca de movimentações." });
            } res.status(200).json(results);
        })
    }
};

module.exports = controllerMov;
