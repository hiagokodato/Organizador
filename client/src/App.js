import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { Toaster } from 'react-hot-toast'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('token');
      setIsAuthenticated(!!updatedToken);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Toaster position="top-right" /> {/* IMPORTANTE: Adicione este componente */}
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