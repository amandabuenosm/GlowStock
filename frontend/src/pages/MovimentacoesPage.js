import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const MovimentacoesPage = () => {
    const [movimentacoes, setMovimentacoes] = useState([]);

    useEffect(() => {
        fetchMoviment();
        import ('../style/MovimentacoesPage.css');
    }, []);

    const navigate = useNavigate();

    const fetchMoviment = async () => {
       try {
        const response = await api.get('/movimentacoes');
        setMovimentacoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar movimentações:', error);
        } 
    };

    // formatação da data e hora da movimentação
    const formatadata = (dataISO) => {
        const datahora = new Date(dataISO);
        return datahora.toLocaleString('pt-BR', { hour12: false });
    };

    // formalizar a escritura do tipo de movimentação
    const formalize = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
    <div className="mov-container">
        <div className="mov-header">
            <h1>GlowStock - Movimentações de Estoque</h1>
            <button onClick={() => navigate('/menuPrincipal')} className="voltar">Voltar para o Menu</button>
        </div>
        <section className="listamovimentacoes">
            <article className="header-sessao-mov">
                <h2>Lista de Movimentações de Estoque</h2>
            </article>

            <table className="dados-mov">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Tipo de Movimentação</th>
                        <th>Qtde Movimentada</th>
                        <th>Data/Hora da Movimntação</th>
                        <th>Usuário</th>
                    </tr>
                </thead>
                <tbody>
                    {movimentacoes.map((movimentacao) => (
                        <tr key={movimentacao.id}>
                            <td>{movimentacao.produtos}</td>
                            <td>{formalize(movimentacao.tipo_movimentacao)}</td>
                            <td>{movimentacao.quantidade}</td>
                            <td>{formatadata(movimentacao.data_hora)}</td>
                            <td>{movimentacao.usuarios}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    </div>
    );
};

export default MovimentacoesPage;
