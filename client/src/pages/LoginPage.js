import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Importa sua instância configurada do Axios

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log('1. handleSubmit do Login foi chamado!'); // Console.log de depuração
    e.preventDefault(); // Previne o recarregamento padrão da página
    setLoading(true); // Ativa o estado de carregamento
    setError(''); // Limpa mensagens de erro anteriores

    try {
      console.log('2. Tentando enviar requisição POST para login...'); // Console.log de depuração
      console.log('Dados a serem enviados:', { email, password }); // Console.log de depuração

      // CORREÇÃO DA URL: Usando '/api/users/login' para alinhar com o backend
      const response = await api.post('/api/users/login', {
        email,
        password,
      });

      console.log('3. Requisição POST de login bem-sucedida!'); // Console.log de depuração
      console.log('Resposta do Backend (Login):', response.data); // Console.log de depuração

      const { token } = response.data;
      localStorage.setItem('token', token); // Armazena o token recebido

      navigate('/'); // Redireciona para a página principal (Dashboard)

    } catch (err) {
      console.error('4. Requisição POST de login falhou no catch:', err); // Console.log de depuração do erro
      // Exibe a mensagem de erro do backend, se disponível, ou uma genérica
      setError(err.response?.data?.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      console.log('5. Bloco finally do Login executado.'); // Console.log de depuração
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-4 text-center">{error}</p>}
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Não tem uma conta? <Link to="/register" className="text-blue-500 hover:text-blue-700">Registre-se aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;