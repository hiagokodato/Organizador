import { useState } from 'react';
import api from '../services/api'; // Você já tinha importado corretamente!
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            await api.post('/api/users/register', formData);
            
            alert('Usuário cadastrado com sucesso!');
            navigate('/login'); 

        } catch (error) {
            alert('Falha no cadastro: ' + (error.response?.data?.message || 'Verifique seus dados'));
        }
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
                <input type="password" name="password" placeholder="Senha" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Entrar</button>
                <p className="mt-4 text-center">Não tem uma conta? <Link to="/register" className="text-blue-500">Registre-se</Link></p>
            </form>
        </div>
    );
};
export default LoginPage;