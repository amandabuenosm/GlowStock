import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../style/RelatoriosPage.css';
import api from '../services/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const RelatoriosPage = () => {
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);
    const [filtroStatus, setFiltroStatus] = useState('');

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


    const [modalUsuariosAberto, setModalUsuariosAberto] = useState(false);

    const abrirModalUsuarios = () => setModalUsuariosAberto(true);

    // criar modal de filtros dos usuários
    const gerarRelatorioUsuarios = () => {
        const usuariosFiltrados = usuarios.filter(
            u => filtroStatus === '' || u.status === filtroStatus
        );

        const formalize = (string) => {
            if (!string) return '';
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Relatório de Usuários - GlowStock', 65, 20);

        doc.setFontSize(14);
        doc.text(`Status filtrado: ${filtroStatus || 'Todos'}`, 14, 35);

        autoTable(doc, {
            startY: 40,
            head: [['Login', 'Nome Completo', 'Status']],
            body: usuariosFiltrados.map(u => [u.login, u.nomecomp, formalize(u.status)]),
            theme: 'grid',
            headStyles: {
                fillColor: '#3B3973',
                textColor: '#ffffff',
                fontStyle: 'bold',
                halign: 'center',
            },
            bodyStyles: {
                fontSize: 10,
                textColor: 50,
                halign: 'center',
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },
            margin: { top: 30 },
        });

        doc.save('relatorio_usuarios.pdf');
    };


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
                <Link to="#" onClick={abrirModalUsuarios} className="relatorios-usuarios">
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

        {modalUsuariosAberto && (
            <div className="modalusuarios">
                <div className="modal-content">
                    <h2>Filtros - Relatório de Usuários</h2>

                    <label>
                        Status: 
                        <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                    </label>

                    <div className="modal-buttons">
                        <button type="cancel" onClick={() => setModalUsuariosAberto(false)}>Cancelar</button>
                        <button type="submit" onClick={() => {
                            gerarRelatorioUsuarios();
                            setModalUsuariosAberto(false);
                        }}>Gerar PDF</button>
                    </div>
                </div>
            </div>
        )}


    </div>
    );
}

export default RelatoriosPage;