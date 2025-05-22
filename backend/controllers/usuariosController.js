const funcModelUser = require('../models/usuariosModel');

const controllerUsuario = {
    listarusuario: (req, res) => {
        funcModelUser.listarusuario((err, results) => {
            if (err) return res.status(500).json({ erro: err });
            res.json(results);
        });
    },
    buscalogin: (req, res) => {
        const { login, senha } = req.body;
        funcModelUser.buscalogin(login, senha, (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(401).json({ error: 'Usuário/Senha inválidos.' });
            }
            res.json(results[0]);
        });
    },
    buscapeloid: (req, res) => {
        const id = req.params.id;
        funcModelUser.buscapeloid(id, (err, results) => {
            if (err) return res.status(500).json({ erro: err });
            res.json(results[0]);
        });
    },
    criarusuario: (req, res) => {
        const novousuario = req.body;
        funcModelUser.criarusuario(novousuario, (err, result) => {
            if (err) return res.status(500).json({ erro: err });
            res.status(201).json({ id: result.insertId, ...novousuario });
        });
    },
    editarusuario: (req, res) => {
        const id = req.params.id;
        const dadoseditados = req.body;
        funcModelUser.editarusuario(id, dadoseditados, (err) => {
            if (err) return res.status(500).json({ erro: err });
            res.json({ mensagem: 'Usuário atualizado com sucesso!' });
        });
    },
    trocarstatus: (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
        funcModelUser.trocarstatus(id, status, (err) => {
            if (err) return res.status(500).json({ erro: err });
            res.json({ mensagem: 'Status do usuário atualizado com sucesso!' });
        });
    },
    deletarusuario: (req, res) => { 
        const id = req.params.id;
        funcModelUser.deletarusuario(id, (err) => {
            if (err) return res.status(500).json({ erro: err});
            res.json({ mensagem: 'Usuário excluído com sucesso!' });
        });
    }
};

module.exports = controllerUsuario;
