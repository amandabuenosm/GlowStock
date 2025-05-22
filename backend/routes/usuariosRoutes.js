const express = require('express');
const rota = express.Router();
const funcController = require('../controllers/usuariosController');

rota.get('/', funcController.listarusuario);
rota.get('/:id', funcController.buscapeloid);
rota.post('/login', funcController.buscalogin);
rota.post('/', funcController.criarusuario);
rota.put('/:id', funcController.editarusuario);
rota.put('/:id', funcController.trocarstatus);
rota.delete('/:id', funcController.deletarusuario);

module.exports = rota;

// documentação do Swagger
/**
 * @swagger
 * components:
 *  schemas: 
 *    Usuário: 
 *      type: object
 *      required: 
 *        - login
 *        - nomecomp
 *        - senha
 *        - status
 *      properties: 
 *        login: 
 *          type: string
 *          description: Login de acesso do Usuário
 *        nomecomp: 
 *          type: string
 *          description: Nome completo do Usuário
 *        senha: 
 *          type: string
 *          description: Senha do Usuário
 *        status: 
 *          type: string
 *          description: Status do Usuário
 *      example: 
 *         login: pnunes
 *         nomecomp: Patricia Nunes
 *         senha: yearzero
 *         status: ativo
 */

/** 
 * @swagger
 * tags: 
 *   name: Usuários
 *   description: Gestão de Usuários de Loja de Cosméticos
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags: [Usuários]
 *     summary: Retorna uma lista de usuários
 *     responses:
 *       200:
 *         description: Lista de Usuários
 *         content: 
 *           application/json:  
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuário'
 * 
 *   post:
 *     tags: [Usuários]
 *     summary: Criar um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuário'
 *     responses:
 *       201:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuário'
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     tags: [Usuários]
 *     summary: Retornar usuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuário'
 *       404:
 *         description: Usuário não encontrado
 * 
 *   put:
 *     tags: [Usuários]
 *     summary: Atualiza um usuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuário'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 * 
 *   delete:
 *     tags: [Usuários]
 *     summary: Deleta usuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuário'
 *       404:
 *         description: Usuário não encontrado
 */
