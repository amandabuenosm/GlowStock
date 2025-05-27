import { useState } from 'react';
import api from '../services/api';
import '../style/LoginPage.css';

const LoginPage = () => {
    const [formLogin, setForm] = useState({
        login: '',
        senha: '',
    });

    const [novoUsuarioForm, setNovoUsuario] = useState({
        login: '',
        nomecomp: '',
        senha: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    // envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/usuarios/login', formLogin);
            
            // armazena os dados do usuário logado
            sessionStorage.setItem('usuario', JSON.stringify(response.data));

            window.location.href="/menuPrincipal";
        } catch (err) {
            const mensagem = err.response?.data?.error || 'Usuário/Senha inválidos!';
            alert(mensagem);
        }
    }

    const handleSubmitNovoUsuario = async (e) => {
      e.preventDefault();

      try {
          if (isEditing) {
              await api.put(`/usuarios/${editId}`, novoUsuarioForm);
              setIsEditing(false);
              setEditId(null);
          } else {
              await api.post('/usuarios', novoUsuarioForm);
          }
          handleCloseDialog();
      } catch (error) {
          console.error('Erro ao gravar dados do usuário:', error.response ? error.response.data : error);
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

    // mudança nos inputs
    const handleChangeNovoUsuario = (e) => {
        const { name, value } = e.target;
        setNovoUsuario((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const handleOpenDialog = () => {
      setIsEditing(false);
      setEditId(null);
      setNovoUsuario({
        login: '',
        nomecomp: '',
        senha: '',
      });
      setOpenDialog(true);
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
    };

    return (
    <div className="login-container">
        <div className="login-header">
            <h1>Sistema de Controle de Estoque GlowStock</h1>
        </div>
        
        <section className="modulo-login">
            <article className="header-modulo-login">
                <h2>Login</h2>
            </article>
            
            <form onSubmit={ handleSubmit}>
                <input type="text" name="login" placeholder="Usuário" onChange={handleChange} required/>
                
                <input type="password" name="senha" placeholder="Senha" onChange={handleChange} required/>

                <button type="submit">Acessar</button>
            </form>

            <a href="#" onClick={handleOpenDialog}>Não tem uma conta? Registre-se!</a>
        </section>

        {openDialog && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing}Criar Novo Usuário</h2>
            <form onSubmit={handleSubmitNovoUsuario}>
              <input
                type="text"
                name="login"
                placeholder="Login do Usuário"
                value={novoUsuarioForm.login}
                onChange={handleChangeNovoUsuario}
                required
              />
              <input
                type="text"
                name="nomecomp"
                placeholder="Nome Completo do Usuário"
                value={novoUsuarioForm.nomecomp}
                onChange={handleChangeNovoUsuario}
                required
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha do Usuário"
                value={novoUsuarioForm.senha}
                onChange={handleChangeNovoUsuario}
                required
              />
              <div className="modal-actions">
                <button type="cancel" onClick={handleCloseDialog}>Cancelar</button>
                <button type="submit">{isEditing}Salvar Novo Usuário</button>
              </div>
            </form>
          </div>
        </div>
        )}
    </div>
    );
};

export default LoginPage;
