Esse projeto consiste em um sistema de Gestão de Estoque para uma loja de cosméticos, útil para gerenciamento de armazenamento de produtos, permitindo controle de entradas/saídas e atualizações de forma simples. O sistema tem funcionalidades de CRUD, com o uso dos métodos GET, GET BY ID, UPDATE, POST E DELETE. Para facilitar, a documentação de APIs para teste do backend pode ser feita com Swagger. A aplicação está sendo feita com Node.js e React, e a modelagem de banco de dados está sendo realizada no MySQL Workbench. 

Atualmente, o sistema está em fase de desenvolvimento e visa oferecer uma interface ótima, com funções voltadas para o cotidiano de estabelecimentos do ramo de beleza. No entanto, as funções CRUD de produtos, usuários e listagem de movimentações de estoque está concluído, o desenvolvimento complexo do sistema ainda está em andamento. Ainda assim, é possível fazer os testes com o CRUD de produtos, usuários e busca de movimentações.

Configuração do Ambiente e Como Testar o CRUD de Produtos:

1. Após clonar o projeto, acesse a pasta 'backend'
2. Renomeie o arquivo '.env.example' para '.env'
3. Preencha o arquivo '.env' com suas informações reais de conexão com o banco de dados
4. Faça a configuração do MySQL Workbench, montando o banco que está na pasta 'backend', no arquivo 'sql.txt' com os comandos necessários.
5. Após montar o banco, no terminal, dirija-se às pastas 'backend' e 'frontend' e baixe os módulos extras com o comando "npm install".
6. Com os módulos instalados, ainda no terminal, dirija-se a pasta do backend e rode o backend do projeto com o comando "npm start", e confira se a conexão com o banco foi feita.
7. Se for feita a conexão com o banco de dados, dirija-se a pasta do frontend e rode o frontend do projeto com o comando "npm start". Desse modo, irá abrir sozinho no navegador a aplicação. 
