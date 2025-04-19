/** funções de acesso com o banco */

const database = require('../config/db');

const crudprodutos = {
    listarprod: (callback) => {
        database.query('SELECT * FROM produtos', callback);
    },
    buscapeloid: (id, callback) => {
        database.query('SELECT * FROM produtos WHERE id = ?', [id], callback);
    },
    criarprod: (novoproduto, callback) => {
        database.query('INSERT INTO produtos SET ?', novoproduto, callback);
    },
    editaritem: (id, produtoEdit, callback) => {
        database.query('UPDATE produtos SET ? WHERE id = ?', [produtoEdit, id], callback);
    },
    deletaritem: (id, callback) => {
        database.query('DELETE FROM produtos WHERE id = ?', [id], callback);
    },
}

module.exports = crudprodutos;
