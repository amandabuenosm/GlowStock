











/************************************************************************* */

// Ponto de entrada da aplicação

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const produtosRoutes = require('./backend/routes/produtosRoutes');

// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');

// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'API Controle de Estoque - Loja de Cosméticos',
//       version: '1.0.0',
//       description: 'Documentação da API de produtos',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000/api',
//       },
//     ],
//   },
//   apis: ['./backend/routes/*.js'], // local onde estarão os comentários Swagger
// };

// const swaggerDocs = swaggerJsdoc(swaggerOptions);

// app.use(cors());
// app.use(express.json());

// app.use('/api', produtosRoutes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // <- Swagger aqui

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
//   console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
// });

