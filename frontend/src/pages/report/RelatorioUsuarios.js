import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../style/RelatoriosPage.css';

const RelatorioUsuarios = ({ usuarios, onClose }) => {
    const [filterByStatus, setFilterStatus] = useState('');

    const criarelatoriousuarios = () => {
        const usuariosfiltrados = usuarios.filter(
            users => filterByStatus === '' || users.status === filterByStatus
        );

        const formalize = (string) => {
            if (!string) return '';
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Relatório de Usuários - GlowStock', 65, 20);

        doc.setFontSize(14);
        doc.text(`Status filtrado: ${filterByStatus || 'Todos'}`, 14, 35);

        autoTable(doc, {
            startY: 40,
            head: [['Login', 'Nome Completo', 'Status']],
            body: usuariosfiltrados.map(users => [users.login, users.nomecomp, formalize(users.status)]),
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

                <label>
                    Status:
                    <select value={filterByStatus} onChange={e => setFilterStatus(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </label>

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
