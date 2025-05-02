/** controle de rotas */
const funcModelProd = require('../models/produtosModel');
const funcModelMov = require('../models/movimentModel');

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
        funcModelProd.buscapeloid(id, (err, results) => {
            if (err) return res.status(500).json({ erro: err });

            const produtoeditado = results[0];
            const qtde_anterior = produtoeditado.qtde_estoque;
            const nova_qtde = dadoseditados.qtde_estoque;

            // se mudou a quantidade, registrar
            if (qtde_anterior !== nova_qtde) {
                const diferenca = nova_qtde - qtde_anterior;
                const tipomoviment = diferenca > 0 ? 'Entrada' : 'Saída';

                const movimentacao = {
                    produto_id: id,
                    tipo_movimentacao: tipomoviment,
                    quantidade: Math.abs(diferenca),
                    usuario_id: dadoseditados.usuario_id,
                };

                // registrar movimentação 
                funcModelMov.registrarmov(movimentacao, (errmov) => {
                    if (errmov) console.log("Erro ao registrar movimentações:", errmov);
                });
            };

            // atualizar o produto
            funcModelProd.buscapeloid(id, dadoseditados, (err) => {
                if (err) return res.status(500).json({ erro: err });
                res.json({ mensagem: 'Item atualizado com sucesso!' });
            });
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
