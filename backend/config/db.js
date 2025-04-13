/** configurar e exportar a conexão com o banco de dados */

require ('dotenv').config();
const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: process.env.DB_HOST, 
  usuario: process.env.DB_USER,
  senha: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conexao.connect((err) => {
  if(err) {
    console.error('✘ Erro de Conexão com MySQL ✘');
    return;
  } console.log('✔ Conexão concluída com MySQL ✔')
}); 

module.exports = conexao;