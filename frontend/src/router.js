import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProdutosPage from './pages/ProdutosPage';
import LoginPage from './pages/LoginPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* página inicial */}
        <Route path="/" element={<LoginPage />} />

        <Route path="/produtos" element={<ProdutosPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
