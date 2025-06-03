import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../style/RelatoriosPage.css';

const RelatorioMovimentacoes = ({ movimentacoes, produtos, usuarios, onClose }) => {
    const [filterByProduct, setFilterByProduct] = useState('');
    const [filterByTipoMov, setFilterByTipoMov] = useState('');
    const [filterByUser, setFilterByUser] = useState('');
    
    const criarelatoriomovimentacoes = () => {
        const movimentacoesfiltradas = movimentacoes.filter(moviments =>
            (filterByProduct === '' || (moviments.produtos ?? '').toLowerCase().includes(filterByProduct.trim().toLowerCase())) &&
            (filterByTipoMov === '' || moviments.tipo_movimentacao === filterByTipoMov) &&
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
        doc.text(`Produto filtrado: ${formalize(filterByProduct || 'Todos')}`, 14, 35);
        doc.text(`Tipo de Movimentação filtrado: ${formalize(filterByTipoMov || 'Todos')}`, 14, 40);
        doc.text(`Usuário filtrado: ${formalize(filterByUser || 'Nenhum')}`, 14, 45);

        autoTable(doc, {
            startY: 50,
            head: [['Produto', 'Saída/Entrada', 'Qtde Movimentada', 'Data/Hora da Movimentação', 'Usuário Responsável']],
            body: movimentacoesfiltradas.map(moviments => [
                moviments.produtos, // agora é só string
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

    const handleProdutoInput = (e) => {
        setFilterByProduct(e.target.value);
    };

    const handleUsuarioInput = (e) => {
        setFilterByUser(e.target.value);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Filtros para Movimentações</h2>

                <label>
                    Produto:
                    <input
                        value={filterByProduct}
                        onChange={handleProdutoInput}
                        placeholder="Digite o produto completo com acentos"
                    />
                </label>

                <label>
                    Tipo de Movimentação:
                    <select value={filterByTipoMov} onChange={e => setFilterByTipoMov(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="saida">Saída</option>
                        <option value="entrada">Entrada</option>
                    </select>
                </label>

                <label>
                    Usuário:
                    <input
                        value={filterByUser}
                        onChange={handleUsuarioInput}
                        placeholder="Digite o nome completo do usuário com acentos"
                    />
                </label>

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
}

export default RelatorioMovimentacoes;
