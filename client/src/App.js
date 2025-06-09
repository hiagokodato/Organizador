import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  // A lógica do token para proteger a rota principal está correta.
  const token = localStorage.getItem('token');

  return (
    <div>
      <Routes>
        {/* Rota para a página de Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rota para a página de Registro. DEVE ESTAR AQUI! */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Rota principal, protegida */}
        <Route 
          path="/" 
          element={token ? <DashboardPage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
}

export default App;