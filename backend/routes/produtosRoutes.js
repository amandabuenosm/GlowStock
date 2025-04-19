/** definir rotas da API */

const express = require('express');
const rota = express.Router();
const funcController = require('../controllers/produtosController');

rota.get('/', funcController.listarprod);
rota.get('/:id', funcController.buscapeloid);
rota.post('/', funcController.criarprod);
rota.put('/:id', funcController.editaritem);
rota.delete('/:id', funcController.deletaritem);

module.exports = rota;

// documentação do Swagger
/**
 * @swagger
 * components:
 *  schemas: 
 *    Produto: 
 *      type: object
 *      required: 
 *        - nome
 *        - codigo
 *        - preco
 *        - marca
 *      properties: 
 *        id:
 *          type: integer
 *          description: ID do Produto
 *        nome: 
 *          type: string
 *          description: Nome/Descrição do Produto
 *        codigo: 
 *          type: string
 *          description: Código do Produto
 *        preco: 
 *          type: number
 *          format: float
 *          description: Preço do Produto
 *        qtde_estoque: 
 *          type: integer
 *          description: Quantidade em Estoque
 *        marca:
 *          type: string 
 *          description: Marca do Produto
 *      example: 
 *         id: 1
 *         nome: Creme Hidratante
 *         codigo: CHOB123
 *         preco: 68.99
 *         qtde_estoque: 10
 *         marca: O Boticário
 */

/** 
 * @swagger
 * tags: 
 *   name: Produtos
 *   description: Gestão de Produtos de Loja de Cosméticos
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     tags: [Produtos]
 *     summary: Retorna uma lista de produtos
 *     responses:
 *       200:
 *         description: Lista de Produtos
 *         content: 
 *           application/json:  
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 * 
 *   post:
 *     tags: [Produtos]
 *     summary: Criar um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 */

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     tags: [Produtos]
 *     summary: Retornar produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 * 
 *   put:
 *     tags: [Produtos]
 *     summary: Atualiza um produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 * 
 *   delete:
 *     tags: [Produtos]
 *     summary: Deleta produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
