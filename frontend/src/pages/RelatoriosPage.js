import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../style/RelatoriosPage.css';
import api from '../services/api';
import RelatorioUsuarios from './report/RelatorioUsuarios';
import RelatorioProdutos from './report/RelatorioProdutos';
import RelatorioMovimentacoes from './report/RelatorioMovimentacoes';

const RelatoriosPage = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [modaldeusuarios, openModalusuarios] = useState(false);

    const [produtos, setProdutos] = useState([]);
    const [modaldeprodutos, openModalprodutos] = useState(false);

    const [movimentacoes, setMovimentacoes] = useState([]);
    const [modaldemovimentacoes, openModalmovimentacoes] = useState(false)

    const listarusuarios = async () => {
        try {
            const response = await api.get('/usuarios');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        }
    };

    const listarprodutos = async () => {
        try {
            const response = await api.get('/produtos');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return [];
        }
    };

    const listarmovimentacoes = async () => {
        try {
            const response = await api.get('/movimentacoes');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar movimentações:', error);
            return [];
        }
    };

    useEffect(() => {
        async function fetchData() {
            const dadosusuarios = await listarusuarios();
            setUsuarios(dadosusuarios);

            const dadosprodutos = await listarprodutos();
            setProdutos(dadosprodutos);

            const dadosmoviment = await listarmovimentacoes();
            setMovimentacoes(dadosmoviment);
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
                    <h2>Selecione um módulo para emitir relatório e analisar melhor seus negócios!</h2>
                </article>

                <article className="sessoes">
                    <Link to="#" onClick={() => openModalusuarios(true)} className="relatorios-usuarios">
                        <h3>Usuários</h3>
                        <h5>Emita um relatório contendo dados dos usuários do sistema GlowStock por aqui!</h5>
                    </Link>

                    <Link to="#" onClick={() => openModalprodutos(true)} className="relatorios-produtos">
                        <h3>Produtos</h3>
                        <h5>Emita um relatório contendo dados dos produtos e suas quantidades em estoque por aqui!</h5>
                    </Link>

                    <Link to="#" onClick={() => openModalmovimentacoes(true)} className="relatorios-movimentacao">
                        <h3>Movimentações</h3>
                        <h5>Emita um relatório contendo dados de movimentações de estoque de produtos do GlowStock por aqui!</h5>
                    </Link>
                </article>
            </section>

            {modaldeusuarios && (
                <RelatorioUsuarios
                    usuarios={usuarios}
                    onClose={() => openModalusuarios(false)}
                />
            )}

            {modaldeprodutos && (
                <RelatorioProdutos
                    produtos={produtos}
                    onClose={() => openModalprodutos(false)}
                />
            )}

            {modaldemovimentacoes && (
                <RelatorioMovimentacoes
                    movimentacoes={movimentacoes}
                    onClose={() => openModalmovimentacoes(false)}
                />
            )}
        </div>
    );
}

export default RelatoriosPage;
