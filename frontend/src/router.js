import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProdutosPage from './pages/ProdutosPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import MovimentacoesPage from './pages/MovimentacoesPage';
import UsuariosPage from './pages/UsuariosPage';
import RelatoriosPage from './pages/RelatoriosPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* página inicial */}
        <Route path="/" element={<LoginPage />} />

        <Route path="/menuPrincipal" element={<MenuPage />} />
        <Route path="/movimentacoes" element={<MovimentacoesPage />} />
        <Route path="/produtos" element={<ProdutosPage/>} />
        <Route path="/usuarios" element={<UsuariosPage/>} />
        <Route path="/relatorios" element={<RelatoriosPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
