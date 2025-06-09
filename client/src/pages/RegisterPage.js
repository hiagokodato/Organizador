import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
            window.location.reload();
        } catch (error) {
             alert('Falha no registro: ' + (error.response?.data?.message || 'Erro no servidor'));
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Registrar</h2>
                <input type="text" name="name" placeholder="Nome" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
                <input type="password" name="password" placeholder="Senha" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Registrar</button>
                <p className="mt-4 text-center">Já tem uma conta? <Link to="/login" className="text-blue-500">Faça Login</Link></p>
            </form>
        </div>
    );
};
export default RegisterPage;