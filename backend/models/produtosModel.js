const database = require('../config/db');

const crudprodutos = {
  listarprod: () => {
    return new Promise((resolve, reject) => {
      database.query('SELECT * FROM produtos', (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  buscapeloid: (id) => {
    return new Promise((resolve, reject) => {
      database.query('SELECT * FROM produtos WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  criarprod: (novoproduto) => {
    return new Promise((resolve, reject) => {
      database.query('INSERT INTO produtos SET ?', novoproduto, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  editaritem: (id, produtoEdit) => {
    return new Promise((resolve, reject) => {
      database.query('UPDATE produtos SET ? WHERE id = ?', [produtoEdit, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  deletaritem: (id) => {
    return new Promise((resolve, reject) => {
      database.query('DELETE FROM produtos WHERE id = ?', [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
};

module.exports = crudprodutos;
