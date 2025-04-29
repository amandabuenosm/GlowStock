import React from 'react';

const MenuPage = () => {
    
    return (
    <div className="menu-container">
        <div className="menu-header">
            <h1>GlowStock - Menu Principal</h1>
        </div>
        
        <section className="modulo-menu">
            <article className="header-menu">
                <h2>Selecione um módulo para seu melhor controle de estoque</h2>
            </article>
            
            <article className="sessoes">
                <div className="sessao-usuarios">
                    <h3>Usuários</h3>
                    <h5>Faça a manutenção dos usuários de seu sistema de controle de estoque por aqui!</h5>
                </div>
                <div className="sessao-produtos">
                    <h3>Produtos</h3>
                    <h5>Faça a manutenção dos produtos e o controle de saídas e entradas dos itens do seu estoque!</h5>
                </div>
                <div className="sessao-movimentacao">
                    <h3>Movimentações</h3>
                    <h5>Faça a consulta de movimentações de estoque de determinada referência nessa tela de consulta rápida!</h5>
                </div>
                <div className="sessao-relatorios">
                    <h5>Relatórios</h5>
                </div>
            </article>
        </section>

    </div>
    );
}

export default MenuPage;
