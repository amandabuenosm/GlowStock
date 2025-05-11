const database = require('../config/db');

const consultamov = {
    
    registrarmov: (movimentacao, callback) => {
        const valores = [
            movimentacao.produto_id,
            movimentacao.tipo_movimentacao,
            movimentacao.quantidade,
            movimentacao.usuario_id,
        ];

        database.query(
            'INSERT INTO movimentacoes (produto_id, tipo_movimentacao, quantidade, data_hora, usuario_id) VALUES (?, ?, ?, NOW(), ?)',
            valores,
            callback
        );
    },

    movporproduto: (nomeProduto, callback) => {
        database.query(
            `SELECT 
                prod.nome AS produtos,
                mov.tipo_movimentacao,
                mov.quantidade,
                mov.data_hora,
                users.nomecomp AS usuarios
            FROM movimentacoes mov
            JOIN usuarios users ON mov.usuario_id = users.id
            JOIN produtos prod ON mov.produto_id = prod.id
            WHERE prod.nome = ?
            ORDER BY mov.data_hora DESC`,
            [nomeProduto], callback
        );
    },


    listarmovimentacoes: (callback) => {
        database.query(
            `SELECT 
                mov.id, 
                prod.nome AS produtos, 
                mov.tipo_movimentacao, 
                mov.quantidade, 
                mov.data_hora, 
                users.nomecomp AS usuarios
            FROM movimentacoes mov
            JOIN produtos prod ON mov.produto_id = prod.id
            JOIN usuarios users ON mov.usuario_id = users.id
            ORDER BY mov.data_hora DESC`,
            callback
        );
    },
};

module.exports = consultamov;
