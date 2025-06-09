// Remove 'BrowserRouter as Router' da importação, pois não é mais usado aqui
import { Routes, Route, Navigate } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const token = localStorage.getItem('token');

  return (
    // O <Router> foi removido daqui
    <div className="bg-gray-100 min-h-screen">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/" 
          element={token ? <DashboardPage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
    // E daqui
  );
}

export default App;