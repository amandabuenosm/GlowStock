import { useState, useEffect } from 'react';
import Select from 'react-select';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from '../../services/api';
import '../../style/RelatoriosPage.css';

const RelatorioUsuarios = ({ usuarios, onClose }) => {
    const [filterByStatus, setFilterStatus] = useState({ value: '', label: 'Todos' });

    const criarelatoriousuarios = () => {
        const usuariosfiltrados = usuarios.filter(users =>
            (filterByStatus.value === '' || users.status === filterByStatus.value)
        );

        const formalize = (string) => {
            if (!string) return '';
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Relatório de Usuários - GlowStock', 65, 20);

        doc.setFontSize(14);
        doc.text(`Status filtrado: ${formalize(filterByStatus.label || 'Todos')}`, 14, 35);

        autoTable(doc, {
            startY: 40,
            head: [['Login', 'Nome Completo', 'Status']],
            body: usuariosfiltrados.map(users => [
                users.login,
                users.nomecomp,
                formalize(users.status)
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

        doc.save('relatorioDeUsuarios.pdf');
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Filtros para Usuários</h2>

                <div className="seletorstatususer" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ minWidth: '100px', marginRight: '20px' }}>Status:</label>
                    <Select
                        id="status"
                        className="seletor"
                        options={[
                            { value: '', label: 'Todos' },
                            { value: 'inativo', label: 'Inativo' },
                            { value: 'ativo', label: 'Ativo' }
                        ]}
                        value={filterByStatus}
                        onChange={setFilterStatus}
                        placeholder="Selecione um status"
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: '200px',
                                fontSize: '13px',
                            })
                        }}
                    />
                </div>

                <div className="modal-buttons">
                    <button type="cancel" onClick={onClose}>Cancelar</button>
                    <button type="submit" onClick={() => {
                        criarelatoriousuarios();
                        onClose();
                    }}>Gerar PDF</button>
                </div>
            </div>
        </div>
    );
};

export default RelatorioUsuarios;
