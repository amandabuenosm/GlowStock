import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProdutosPage from './pages/ProdutosPage'; 

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* página inicial */}
        <Route path="/" element={<ProdutosPage />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;
