import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const LoginPage = () => {
    const [formLogin, setForm] = useState({
        login: '',
        senha: '',
    });
    const [error, setError] = useState('');

    // envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/usuarios/login', formLogin);
            
            // armazena os dados do usuário logado
            sessionStorage.setItem('usuario', JSON.stringify(response.data));

            window.location.href = '/';
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao fazer login. Tente novamente!')
        }
    }

    // mudança nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    return (
    <div className="page-container">
        <div className="header">
            <h1>Sistema de Controle de Estoque GlowStock</h1>
        </div>
        
        <section className="modulo-login">
            
        </section>


    </div>
    );
};
