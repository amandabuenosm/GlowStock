import React, { useState, useEffect } from 'react';
import api from '../services/api';

const MovimentacoesPage = () => {
    const [movimentacoes, setMovimentacoes] = useState([]);

    useEffect(() => {
        fetchMoviment();
    }, []);

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
            <h1>Sistema de Controle de Estoque GlowStock</h1>
        </div>
        <section className="listamovimentacoes">

            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Tipo de Movimentação</th>
                        <th>Qtde Movimentada</th>
                        <th>Data/Hora da Mov</th>
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
