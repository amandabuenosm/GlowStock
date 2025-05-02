/** ponto de entrada da aplicação */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerui = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');

const rotaprodutos = require('./routes/produtosRoutes');
const rotausuarios = require('./routes/usuariosRoutes');
const rotamovimentacoes = require('./routes/movimentRoutes');
const app = express();
app.use(cors());
app.use(express.json());

const localswagger = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Gestão de Estoque de Cosméticos API',
            version: '1.0.0',
            description: 'Documentação da API do Sistema de Estoque de Cosméticos GlowStock',
            servers: {
                url: 'http://localhost:5000/api'
            },
        },
    },
    apis: ['./routes/*.js'],
};

const configswagger = swaggerjsdoc(localswagger);
app.use('/produtos', rotaprodutos)
app.use('/usuarios', rotausuarios);
app.use('/movimentacoes', rotamovimentacoes)
app.use('/api-glowstock', swaggerui.serve, swaggerui.setup(configswagger));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação Swagger disponível em http:localhost:${PORT}/api-glowstock`);
});
