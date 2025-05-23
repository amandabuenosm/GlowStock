import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetchUsuarios();
        import ('../style/UsuariosPage.css');
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

    const [formulario, setForm] = useState({
        login: '',
        nomecomp: '',
        senha: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          if (isEditing) {
              await api.put(`/usuarios/${editId}`, formulario);  // envio de dados ao backend
              setIsEditing(false);
              setEditId(null);
          } else {
              await api.post('/usuarios', formulario);
          }
          fetchUsuarios();  // recarregar usuário para atualizar no frontend
          handleCloseDialog();
      } catch (error) {
          console.error('Erro ao gravar dados do usuário:', error.response ? error.response.data : error);
      }
    };

    const handleEdit = (usuario) => {
      setIsEditing(true);
      setEditId(usuario.id);
      setForm({
        login: usuario.login,
        nomecomp: usuario.nomecomp,
        senha: usuario.senha,
        status: usuario.status || '',
      });
      setOpenDialog(true);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleDelete = async (id) => {
      try {
        await api.delete(`/usuarios/${id}`);
        fetchUsuarios();
      } catch (error) {
          const mensagem = error.response?.data?.error || 'Não é possível excluir este usuário pois existem movimentações de estoque vinculadas a ele.';
          alert(mensagem);
      }
    };

    const handleOpenDialog = () => {
      setIsEditing(false);
      setEditId(null);
      setForm({
        login: '',
        nomecomp: '',
        senha: '',
      });
      setOpenDialog(true);
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handlePutStatus = async (id, currentStatus) => {
      const novostatus = currentStatus === 'ativo' ? 'inativo' : 'ativo';
      try {
        await api.put(`/usuarios/${id}`, { status: novostatus });
        fetchUsuarios();
      } catch (error) {
        console.error("Erro ao atualizar status:", error);
      }
    };

    const formalize = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h1>Controle de Usuários</h1>
        <button onClick={() => navigate('/menuPrincipal')} className="voltar">Voltar para o Menu</button>
      </div>

      <div className="actions">
        <button onClick={handleOpenDialog}>Adicionar Novo Usuário</button>
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
              <td>{formalize(usuario.status)}</td>
              <td>
                <button onClick={() => handleEdit(usuario)}>Editar</button>
                <button onClick={() => handleDelete(usuario.id)}>Excluir</button>
                <button onClick={() => handlePutStatus(usuario.id, usuario.status)}>{usuario.status === 'ativo' ? 'Inativar' : 'Ativar'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openDialog && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="login"
                placeholder="Login do Usuário"
                value={formulario.login}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="nomecomp"
                placeholder="Nome Completo do Usuário"
                value={formulario.nomecomp}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha do Usuário"
                value={formulario.senha}
                onChange={handleChange}
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={handleCloseDialog}>Cancelar</button>
                <button type="submit">{isEditing ? 'Atualizar' : 'Salvar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>        
    );
};

export default UsuariosPage;