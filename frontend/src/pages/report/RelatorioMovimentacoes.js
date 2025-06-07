import { useState, useEffect } from 'react';
import Select from 'react-select';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from '../../services/api';
import '../../style/RelatoriosPage.css';

const RelatorioMovimentacoes = ({ movimentacoes, onClose }) => {

    const [filterByProduct, setFilterByProduct] = useState(null);
    const [filterByTipoMov, setFilterByTipoMov] = useState({ value: '', label: 'Todos' });
    const [filterByUser, setFilterByUser] = useState('');
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await api.get('/produtos');
                const options = response.data.map(produto => ({
                    value: produto.nome,
                    label: produto.nome
                }));
                setProdutos([{ value: '', label: 'Todos' }, ...options]);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        } fetchProdutos();
    }, []);

    const criarelatoriomovimentacoes = () => {
        const produtoselecionado = filterByProduct?.value || '';

        const movimentacoesfiltradas = movimentacoes.filter(moviments =>
            (produtoselecionado === '' || (moviments.produtos ?? '').toLowerCase().includes(produtoselecionado.toLowerCase())) &&
            (filterByTipoMov.value === '' || moviments.tipo_movimentacao === filterByTipoMov.value) &&
            (filterByUser === '' || (moviments.usuarios ?? '').toLowerCase().includes(filterByUser.trim().toLowerCase()))
        );


        const formalize = (string) => {
            if (!string) return '';
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        const formatadata = (dataISO) => {
            const datahora = new Date(dataISO);
            return datahora.toLocaleString('pt-BR', { hour12: false });
        };

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Relatório de Movimentações de Estoque - GlowStock', 37.5, 20);

        doc.setFontSize(13);
        doc.text(`Produto filtrado: ${formalize(produtoselecionado || 'Todos')}`, 14, 35);
        doc.text(`Tipo de Movimentação filtrado: ${formalize(filterByTipoMov.label || 'Todos')}`, 14, 40);
        doc.text(`Usuário filtrado: ${formalize(filterByUser || 'Nenhum')}`, 14, 45);

        autoTable(doc, {
            startY: 50,
            head: [['Produto', 'Saída/Entrada', 'Qtde Movimentada', 'Data/Hora da Movimentação', 'Usuário Responsável']],
            body: movimentacoesfiltradas.map(moviments => [
                moviments.produtos,
                formalize(moviments.tipo_movimentacao),
                moviments.quantidade,
                formatadata(moviments.data_hora),
                moviments.usuarios
            ]),
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

        doc.save('relatorioDeMovimentacoes.pdf');
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Filtros para Movimentações</h2>

                <div className="seletorproduto" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ minWidth: '100px' }}>Produto:</label>
                    <Select
                        id="produto"
                        className="seletorDigit"
                        options={produtos}
                        value={filterByProduct}
                        onChange={setFilterByProduct}
                        placeholder="Digite ou selecione um produto"
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: '200px',
                                fontSize: '13px',
                            })
                        }}
                    />
                </div>

                <div className="seletortipomov" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ minWidth: '100px', marginRight: '20px' }}>Tipo de Mov:</label>
                    <Select
                        id="movimentacao"
                        className="seletor"
                        options={[
                            { value: '', label: 'Todos' },
                            { value: 'entrada', label: 'Entrada' },
                            { value: 'saida', label: 'Saída' }
                        ]}
                        value={filterByTipoMov}
                        onChange={setFilterByTipoMov}
                        placeholder="Selecione um tipo de movimentação"
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: '200px',
                                fontSize: '13px',
                            })
                        }}
                    />
                </div>
                
                {/* --------------------------------------------------------------- */}
                {/* ajustar filtro de usuários para se assemelhar com o de produtos */}
                {/* --------------------------------------------------------------- */}
                
                {/* <label>
                    Usuário:
                    <input
                        value={filterByUser}
                        onChange={e => setFilterByUser(e.target.value)}
                        placeholder="Digite o nome completo do usuário com acentos"
                    />
                </label> */}


                <div className="modal-buttons">
                    <button type="cancel" onClick={onClose}>Cancelar</button>
                    <button type="submit" onClick={() => {
                        criarelatoriomovimentacoes();
                        onClose();
                    }}>Gerar PDF</button>
                </div>
            </div>
        </div>
    );
};

export default RelatorioMovimentacoes;
