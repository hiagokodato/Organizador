const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const mongoose = require('mongoose'); // Não precisa mais do mongoose aqui
const connectDB = require('./config/db'); // NOVO: Importa nossa função

// Carrega variáveis de ambiente
dotenv.config();

// Conecta ao Banco de Dados
connectDB(); // NOVO: Chama a função para conectar

// Rotas
const userRoutes = require('./routes/users.js'); 
const transactionRoutes = require('./routes/transactions.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

/*
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch(err => console.error('Erro ao conectar no MongoDB:', err));
*/

// Usar as rotas
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));