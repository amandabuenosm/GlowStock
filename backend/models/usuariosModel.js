const database = require('../config/db');

const crudusuarios = {
    listarusuario: (callback) => {
        database.query('SELECT * FROM usuarios', callback);
    },
    buscalogin: (login, senha, callback) => {
        database.query('SELECT * FROM usuarios WHERE login = ? AND senha = ?', [login, senha], callback)
    },
    buscapeloid: (id, callback) => {
        database.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
    },
    criarusuario: (novousuario, callback) => {
        database.query('INSERT INTO usuarios SET ?', novousuario, callback);
    },
    editarusuario: (id, usuarioEdit, callback) => {
        database.query('UPDATE usuarios SET ? WHERE id = ?', [usuarioEdit, id], callback);
    },
    deletarusuario: (id, callback) => {
        database.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
    },
}

module.exports = crudusuarios;
