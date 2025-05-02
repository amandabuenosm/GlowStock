const database = require('../config/db');

const consultamov = {
    // inserir movimentações de estoque no banco de dados
    registrarmov: (movimentacao, callback) => {
        const valores = [
            movimentacao.produto_id, 
            movimentacao.tipo_movimentacao,
            movimentacao.quantidade,
            movimentacao.usuario_id,
        ];

        database.query('INSERT INTO movimentacoes (produto_id, tipo_movimentacao, quantidade, data_hora, usuario_id) VALUES (?, ?, ?, NOW(), ?)', valores, callback);
    },

    // buscar movimentações de apenas um produto
    movporproduto: (idProduto, callback) => {
        database.query('SELECT mov.tipo_movimentacao, mov.quantidade, mov.data_hora, users.nomecomp FROM movimentacoes mov JOIN usuarios users ON mov.usuario_id = users.id WHERE mov.produto_id = ? ORDER BY mov.data_hora DESC', idProduto, callback);
    },
};

module.exports = consultamov;
