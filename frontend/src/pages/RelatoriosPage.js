import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../style/RelatoriosPage.css';
import api from '../services/api';
import RelatorioUsuarios from './report/RelatorioUsuarios';

const RelatoriosPage = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [modaldeusuarios, openModalusuarios] = useState(false);

    const listarusuarios = async () => {
        try {
            const response = await api.get('/usuarios');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        }
    };

    useEffect(() => {
        async function fetchData() {
            const dados = await listarusuarios();
            setUsuarios(dados);
        }
        fetchData();
    }, []);

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
                    <Link to="#" onClick={() => openModalusuarios(true)} className="relatorios-usuarios">
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

            {modaldeusuarios && (
                <RelatorioUsuarios
                    usuarios={usuarios}
                    onClose={() => openModalusuarios(false)}
                />
            )}
        </div>
    );
}

export default RelatoriosPage;
