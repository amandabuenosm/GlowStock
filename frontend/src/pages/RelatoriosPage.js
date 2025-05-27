import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../style/RelatoriosPage.css';
import 'jspdf-autotable';

const RelatoriosPage = () => {
    const navigate = useNavigate();

    // criar modal de filtros dos usuários
   
    // criar modal de filtros dos produtos

    // criar modal de filtros das movimentações

    return (
    <div className="relatorios-container">
        <div className="relatorios-header">
            <h1>GlowStock - Relatórios</h1>
            <button onClick={() => navigate('/menuPrincipal')} className="voltar">Sair</button>
        </div>
        
        <section className="modulo-relatorios">
            <article className="header-modulo-relatorios">
                <h2>Selecione um tipo de relatório para analisar melhor seus negócios!</h2>
            </article>
            
            <article className="sessoes">
                <Link to="#" className="relatorios-usuarios">
                    <h3>Usuários</h3>
                    <h5>Emita relatórios contendo dados dos usuários do sistema GlowStock por aqui!</h5>
                </Link>

                <Link to="#" className="relatorios-produtos">
                    <h3>Produtos</h3>
                    <h5>Emita relatórios contendo dados dos produtos e suas quantidades em estoque por aqui!</h5>
                </Link>

                <Link to="#" className="relatorios-movimentacao">
                    <h3>Movimentações</h3>
                    <h5>Emita relatórios contendo dados de movimentações de estoque de produtos do GlowStock por aqui!</h5>
                </Link>
            </article>
        </section>

        {/* opendialog */}

    </div>
    );
}

export default RelatoriosPage;