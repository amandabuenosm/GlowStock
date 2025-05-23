import { useState } from 'react';
import api from '../services/api';
import '../style/LoginPage.css';

const LoginPage = () => {
    const [formLogin, setForm] = useState({
        login: '',
        senha: '',
    });

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

    // mudança nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
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

            <a link href="/" target="blank">Não tem uma conta? Registre-se!</a>
        </section>

    </div>
    );
};

export default LoginPage;
