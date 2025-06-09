import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; // Importe useState e useEffect
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  // 1. Use useState para gerenciar o estado de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 2. Use useEffect para verificar o token e atualizar o estado
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Se o token existir, defina isAuthenticated como true, caso contrário, como false
    setIsAuthenticated(!!token);

    // Opcional: Adicionar um listener para mudanças no localStorage (útil para logout em outras abas)
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('token');
      setIsAuthenticated(!!updatedToken);
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpeza: Remova o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

  }, []); // O array de dependências vazio [] faz com que o useEffect execute apenas uma vez na montagem

  return (
    <div>
      <Routes>
        {/* Rota para a página de Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rota para a página de Registro */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Rota principal, protegida */}
        <Route
          path="/"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;