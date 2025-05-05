const funcModelProd = require('../models/produtosModel');
const funcModelMov = require('../models/movimentModel');

const controllerProd = {
  listarprod: async (req, res) => {
    try {
      const results = await funcModelProd.listarprod();
      res.json(results);
    } catch (err) {
      res.status(500).json({ erro: err });
    }
  },

  buscapeloid: async (req, res) => {
    const id = req.params.id;
    try {
      const results = await funcModelProd.buscapeloid(id);
      if (results.length === 0) {
        return res.status(404).json({ erro: "Produto não encontrado." });
      }
      res.json(results[0]);
    } catch (err) {
      res.status(500).json({ erro: err });
    }
  },

  criarprod: async (req, res) => {
    const novoprod = req.body;
    try {
      const result = await funcModelProd.criarprod(novoprod);
      res.status(201).json({ id: result.insertId, ...novoprod });
    } catch (err) {
      res.status(500).json({ erro: err });
    }
  },

  editaritem: async (req, res) => {
    const id = req.params.id;
    const dadoseditados = req.body;
  
    try {
      const results = await funcModelProd.buscapeloid(id);
  
      if (results.length === 0) {
        return res.status(404).json({ erro: "Produto não encontrado." });
      }
  
      const produtoeditado = results[0];
      const qtde_anterior = produtoeditado.qtde_estoque;
      const nova_qtde = dadoseditados.qtde_estoque;
  
      // se mudou a quantidade, registra movimentação
      if (qtde_anterior !== nova_qtde) {
        if (!dadoseditados.usuario_id) {
          return res.status(400).json({ erro: "Usuário não informado para registrar movimentação!" });
        }
  
        const diferenca = nova_qtde - qtde_anterior;
        const tipomoviment = diferenca > 0 ? 'entrada' : 'saida';
  
        const movimentacao = {
          produto_id: id,
          tipo_movimentacao: tipomoviment,
          quantidade: Math.abs(diferenca),
          usuario_id: dadoseditados.usuario_id,
        };
  
        await funcModelMov.registrarmov(movimentacao);
      }
  
      // atualiza produto sem o usuario_id
      const { usuario_id, ...dadosparaeditar } = dadoseditados;
  
      await funcModelProd.editaritem(id, dadosparaeditar);
  
      res.json({ mensagem: 'Item atualizado com sucesso!', produto: { ...dadosparaeditar, id } });
  
    } catch (err) {
      console.error('Erro no editaritem:', err);
      res.status(500).json({ erro: 'Erro interno no servidor', detalhes: err });
    }
  },
  

  deletaritem: async (req, res) => {
    const id = req.params.id;
    try {
      await funcModelProd.deletaritem(id);
      res.json({ mensagem: 'Item excluído com sucesso!' });
    } catch (err) {
      res.status(500).json({ erro: err });
    }
  }
};

module.exports = controllerProd;
