// /client/src/pages/LoginPage.js
import { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/users/login', formData);
            
            localStorage.setItem('token', res.data.token);
            
            navigate('/');
            window.location.reload(); 

        } catch (error) {
            alert('Falha no login: ' + (error.response?.data?.message || 'Email ou senha incorretos'));
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
                <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Entrar</button>
                <p className="mt-4 text-center">Não tem uma conta? <Link to="/register" className="text-blue-500">Registre-se</Link></p>
            </form>
        </div>
    );
};

export default LoginPage;