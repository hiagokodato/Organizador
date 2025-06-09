// /server/server.js

// 1. IMPORTAÇÕES (cada uma apenas uma vez)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Importa a função de conexão

// Importa suas rotas
const userRoutes = require('./routes/users.js'); 
const transactionRoutes = require('./routes/transactions.js');

// 2. CONFIGURAÇÕES INICIAIS
dotenv.config(); // Carrega as variáveis do .env
connectDB(); // Executa a conexão com o banco de dados

const app = express(); // Cria a aplicação Express (apenas uma vez)

// 3. MIDDLEWARES
app.use(cors());
app.use(express.json()); // Middleware para o backend entender JSON

// 4. USO DAS ROTAS
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// 5. INICIALIZAÇÃO DO SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));