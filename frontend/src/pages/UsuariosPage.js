import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetchUsuarios();
        // import ('../style/UsuariosPage.css');
    }, []);

    const navigate = useNavigate();

    const fetchUsuarios = async () => {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    // adicionar função handleSubmit para incluir formulário de novo usuário

    //   const [formulario, setForm] = useState({
    //      variáveis para formulário
    //   });
    //   const [isEditing, setIsEditing] = useState(false);
    //   const [editId, setEditId] = useState(null);
    //   const [openDialog, setOpenDialog] = useState(false);

    // adicionar funções handleEdit e handleChange para editar dados de um usuário

    // adicionar função handleDelete somente para excluir usuários sem movimentações de produto vinculadas a ele

    // adicionar funções handleOpenDialog e handleCloseDialog para abrir modal de inclusão/edição de usuários

    // adicionar função para inativar usuários

    return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h1>Controle de Usuários</h1>
        <button onClick={() => navigate('/menuPrincipal')} className="voltar">Voltar para o Menu</button>
      </div>

      <div className="actions">
        <button onClick>Adicionar Novo Usuário</button>
      </div>

      <table className="dados-usuarios">
        <thead>
          <tr>
            <th>Login do Usuário</th>
            <th>Nome Completo</th>
            <th>Status do Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.login}</td>
              <td>{usuario.nomecomp}</td>
              <td>{usuario.status}</td>
              <td>
                <button onClick>Editar</button>
                <button onClick>Excluir</button>
                <button onClick>Inativar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>        
    );
};

export default UsuariosPage;