import axios from 'axios';

// Cria uma instância do Axios com uma configuração base.
const api = axios.create({
  // Ele vai usar a variável de ambiente do Vercel/Render quando estiver online.
  // Caso contrário, em modo local, usará o endereço do localhost.
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Interceptor para adicionar o Token de autenticação em todas as requisições.
// Isso evita que a gente tenha que adicionar o header em toda chamada da API.
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor para lidar com erros de autenticação globalmente
api.interceptors.response.use(
  response => response,
  error => {
    // Se for erro 401 (Não autorizado) e não for a rota de login
    // Verifica se a URL da requisição NÃO é a de login para evitar loop infinito
    if (error.response && error.response.status === 401 && !error.config.url.includes('/api/auth/login')) {
      localStorage.removeItem('token'); // Remove o token inválido
      console.warn('Token expirado ou inválido. Redirecionando para o login.');
      // O 'window.location.href' força um refresh completo da página,
      // fazendo com que o App.js detecte a falta de token e redirecione.
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;