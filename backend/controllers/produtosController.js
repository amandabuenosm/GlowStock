/** controle de rotas */
const funcModelProd = require('../models/produtosModel');

const controllerProd = {
    listarprod: (req, res) => {
        funcModelProd.listarprod((err, results) => {
            if (err) return res.status(500).json({ erro: err });
            res.json(results);
        });
    },
    buscapeloid: (req, res) => {
        const id = req.params.id;
        funcModelProd.buscapeloid(id, (err, results) => {
            if (err) return res.status(500).json({ erro: err });
            res.json(results[0]);
        });
    },
    criarprod: (req, res) => {
        const novoprod = req.body;
        funcModelProd.criarprod(novoprod, (err, result) => {
            if (err) return res.status(500).json({ erro: err });
            res.status(201).json({ id: result.insertId, ...novoprod });
        });
    },
    editaritem: (req, res) => {
        const id = req.params.id;
        const dadoseditados = req.body;
        funcModelProd.editaritem(id, dadoseditados, (err) => {
            if (err) return res.status(500).json({ erro: err });
            res.json({ mensagem: 'Item atualizado com sucesso!' });
        });
    },
    deletaritem: (req, res) => { 
        const id = req.params.id;
        funcModelProd.deletaritem(id, (err) => {
            if (err) return res.status(500).json({ erro: err});
            res.json({ mensagem: 'Item excluído com sucesso!' });
        });
    }
};

module.exports = controllerProd;