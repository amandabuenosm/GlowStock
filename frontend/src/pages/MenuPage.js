import React from 'react';
import { Link } from 'react-router-dom';
import '../style/MenuPage.css';

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
                <Link to="/usuarios" className="sessao-usuarios">
                    <h3>Usuários</h3>
                    <h5>Faça a manutenção dos usuários de seu sistema de controle de estoque por aqui!</h5>
                </Link>

                <Link to="/produtos" className="sessao-produtos">
                    <h3>Produtos</h3>
                    <h5>Faça a manutenção dos produtos e o controle de saídas e entradas dos itens do seu estoque!</h5>
                </Link>

                <Link to="/movimentacoes" className="sessao-movimentacao">
                    <h3>Movimentações</h3>
                    <h5>Faça a consulta de movimentações de estoque de determinada referência nessa tela de consulta rápida!</h5>
                </Link>

                <Link to="/relatorios" className="sessao-relatorios">
                    <h3>Relatórios</h3>
                </Link>
            </article>
        </section>
    </div>
    );
}

export default MenuPage;
