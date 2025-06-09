import axios from 'axios';

// Cria uma instância do Axios com uma configuração base.
const api = axios.create({
  // A mágica acontece aqui!
  // Ele vai usar a variável de ambiente do Vercel quando estiver online.
  // Caso contrário, em modo local, usará o endereço do localhost.
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

// BÔNUS: Interceptor para adicionar o Token de autenticação em todas as requisições.
// Isso evita que a gente tenha que adicionar o header em toda chamada da API.
api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;