import { useState, useEffect } from 'react';
import Select from 'react-select';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from '../../services/api';
import '../../style/RelatoriosPage.css';

const RelatorioProdutos = ({ produtos, onClose }) => {
    const [filterByMark, setFilterMark] = useState('');
    const [filterByPrice, setFilterByPrice] = useState('');
    const [filterByStock, setFilterByStock] = useState('');
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        async function fetchMarcas() {
            try {
                const response = await api.get('/produtos');
                const marcasnaoduplicadas = [...new Set(response.data.map(produto => produto.marca))];
                 const options = marcasnaoduplicadas.map(marca => ({
                    value: marca,
                    label: marca
                }));
                setMarcas([{ value: '', label: 'Todos '}, ...options]);
            } catch (error) {
                console.error('Erro ao buscar marcas de produtos:', error);
            }
        } fetchMarcas();
    }, []);

    const criarelatorioprodutos = () => {
        const marcaselecionada = filterByMark?.value || '';

        const produtosfiltrados = produtos.filter(products =>
            (marcaselecionada === '' || (products.marca ?? '').toLowerCase().includes(marcaselecionada.toLowerCase())) &&
            (filterByPrice === '' || parseFloat(products.preco) <= parseFloat(filterByPrice)) &&
            (filterByStock === '' || parseInt(products.qtde_estoque) <= parseInt(filterByStock))
        );

        const formalize = (string) => {
            if (!string) return '';
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Relatório de Produtos - GlowStock', 65, 20);

        doc.setFontSize(13);
        doc.text(`Marca filtrada: ${formalize(marcaselecionada || 'Todas')}`, 14, 35);
        doc.text(`Preço filtrado: ${filterByPrice || 'Todos'}`, 14, 40);
        doc.text(`Estoque máximo filtrado: ${filterByStock || 'Nenhum'}`, 14, 45);

        autoTable(doc, {
            startY: 50,
            head: [['Nome', 'Código', 'Preço', 'Qtde em Estoque', 'Marca']],
            body: produtosfiltrados.map(products => [
                products.nome,
                products.codigo,
                products.preco,
                products.qtde_estoque,
                products.marca
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
        doc.save('relatorioDeProdutos.pdf');
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Filtros para Produtos</h2>

                <div className="seletormarca" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ minWidth: '100px' }}>Marca:</label>
                    <Select
                        id="marca"
                        className="seletorDigit"
                        options={marcas}
                        value={filterByMark}
                        onChange={setFilterMark}
                        placeholder="Digite ou selecione uma marca"
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: '200px',
                                fontSize: '13px',
                            })
                        }}
                    />
                </div>

                <label>
                    Preço Máximo:
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Ex: 35.00"
                        value={filterByPrice}
                        onChange={(e) => setFilterByPrice(e.target.value)}
                    />
                </label>

                <label>
                    Estoque Máximo:
                    <input
                        type="number"
                        placeholder="Ex: 15"
                        value={filterByStock}
                        onChange={(e) => setFilterByStock(e.target.value)}
                    />
                </label>

                <div className="modal-buttons">
                    <button type="cancel" onClick={onClose}>Cancelar</button>
                    <button type="submit" onClick={() => {
                        criarelatorioprodutos();
                        onClose();
                    }}>Gerar PDF</button>
                </div>
            </div>
        </div>
    );
};

export default RelatorioProdutos;
