import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const MovimentacoesPage = () => {
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [formBuscaMov, setForm] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMoviment();
        import ('../style/MovimentacoesPage.css');
    }, []);

    const fetchMoviment = async () => {
       try {
        const response = await api.get('/movimentacoes');
        setMovimentacoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar movimentações:', error);
        } 
    };

    const fetchProdutos = async () => {
        try {
            const response = await api.get('/produtos');
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    // envio do formulário para buscar movimentações de um produto
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.get(`/movimentacoes/produto/${formBuscaMov.nome}`);

            if (!response.data || response.data.length === 0) {
                alert('Produto selecionado não teve movimentações de estoque!');
                return;
            }

            setMovimentacoes(response.data); 
            setOpenDialog(false);
        } catch (err) {
            console.error('Erro ao buscar movimentações do produto mencionado:', err);
        }
    };

    // mudança nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const handleOpenDialog = () => {
        setIsReading(false);
        setForm({
        nome: '',
        });
        fetchProdutos();
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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
                <button onClick={fetchMoviment}>Movimentações de Todos os Produtos</button>
                <button onClick={handleOpenDialog}>Movimentações Por Produto</button>
            </article>

            <table className="dados-mov">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Tipo de Movimentação</th>
                        <th>Qtde Movimentada</th>
                        <th>Data/Hora da Movimentação</th>
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

            {openDialog && (
                <div className="modal">
                <div className="modal-content">
                    <h2>{isReading}Consultar Mov por Produto</h2>
                    <form onSubmit={handleSubmit}>
                        <select
                            name="nome"
                            value={formBuscaMov.nome}
                            onChange={handleChange}
                            required
                        >
                            <option value=""></option>
                            {produtos.map((produto) => (
                            <option key={produto.id} value={produto.nome}>
                                {produto.nome}
                            </option>
                            ))}
                        </select>
                        <div className="modal-actions">
                            <button type="cancel" onClick={handleCloseDialog}>Cancelar</button>
                            <button type="submit">{isReading}Consultar</button>
                        </div>
                    </form>
                </div>
                </div>
            )}
        </section>
    </div>
    );
};

export default MovimentacoesPage;
