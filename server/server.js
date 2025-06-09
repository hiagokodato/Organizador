// /server/server.js

// 1. IMPORTAÇÕES (cada uma apenas uma vez)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Importa suas rotas
const userRoutes = require('./routes/users.js');
const transactionRoutes = require('./routes/transactions.js');

// 2. CONFIGURAÇÕES INICIAIS
dotenv.config(); // Carrega as variáveis do .env
connectDB(); // Executa a conexão com o banco de dados

const app = express(); // Cria a aplicação Express (apenas uma vez)

// 3. MIDDLEWARES
// >>>>>> IMPORTANTE: NOVA CONFIGURAÇÃO DO CORS AQUI <<<<<<
const allowedOrigins = [
  'http://localhost:3000', // Para desenvolvimento local
  'https://organizador-xi.vercel.app' // <<<<< SEU DOMÍNIO DO VERCEL >>>>>
  // Adicione outros domínios de frontend se tiver
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requisições sem "origin" (como mobile apps ou postman)
    // ou de uma das origens permitidas
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS')); // Mensagem mais clara
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
  credentials: true, // Permite o envio de cookies e cabeçalhos de autorização
  optionsSuccessStatus: 204 // Para o preflight OPTIONS request
}));

app.use(express.json()); // Middleware para o backend entender JSON

// 4. USO DAS ROTAS
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// 5. INICIALIZAÇÃO DO SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));