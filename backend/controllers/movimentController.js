const funcModelMov = require('../models/movimentModel');

const controllerMov = {
    movporproduto: (req, res) => {
        const idProd = req.params.idProd;
        funcModelMov.movporproduto(idProd, (err, results) => {
            if (err) {
                return res.status(500).json({ erro: "Erro na busca de movimentações." });
            }
            res.status(200).json(results);
        });
    },

    armazenamentomovs: (req, res) => {
        const movimentacao = {
            produto_id: req.body.produto_id,
            tipo_movimentacao: req.body.tipo_movimentacao,
            quantidade: req.body.quantidade,
            usuario_id: req.body.usuario_id 
        };

        if (!movimentacao.usuario_id) {
            return res.status(400).json({ erro: "Usuário não informado!" });
        }

        funcModelMov.registrarmov(movimentacao, (err, result) => {
            if (err) {
                console.error("Erro ao registrar movimentação:", err);
                return res.status(500).json({ erro: "Erro no registro de movimentações." });
            }
            res.status(201).json({ mensagem: "Movimentação registrada com sucesso." });
        });
    }
};

module.exports = controllerMov;
