require('dotenv').config();
const express = require('express');
const cors = require('cors');

const rotaprodutos = require('./routes/produtosRoutes');
const rotausuarios = require('./routes/usuariosRoutes');
const rotamovimentacoes = require('./routes/movimentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/produtos', rotaprodutos)
app.use('/usuarios', rotausuarios);
app.use('/movimentacoes', rotamovimentacoes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
