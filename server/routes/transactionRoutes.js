const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Importa o middleware de proteção

// Exemplo: Suponha que você tenha um modelo de Transação (Transaction.js)
// const Transaction = require('../models/Transaction');

// Exemplo de dados em memória, substitua por seu modelo real
let transactions = []; // Em um projeto real, você usaria um banco de dados

// @route   GET /api/transactions
// @desc    Obter todas as transações do usuário logado
// @access  Private (requer autenticação)
router.get('/', protect, async (req, res) => {
  try {
    // Em um projeto real, você buscaria as transações associadas a req.user._id
    // const userTransactions = await Transaction.find({ user: req.user._id });
    // res.json(userTransactions);
    res.json(transactions.filter(t => t.userId === req.user._id.toString())); // Apenas para demonstração
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar transações.' });
  }
});

// @route   POST /api/transactions
// @desc    Adicionar nova transação
// @access  Private
router.post('/', protect, async (req, res) => {
  const { description, amount, type } = req.body;

  if (!description || !amount || !type) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  const newTransaction = {
    _id: Math.random().toString(36).substr(2, 9), // ID simples para demo
    userId: req.user._id.toString(), // Associa ao usuário logado
    description,
    amount: parseFloat(amount), // Garante que é um número
    type,
    createdAt: new Date().toISOString()
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// @route   DELETE /api/transactions/:id
// @desc    Deletar transação
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  const { id } = req.params;
  
  const initialLength = transactions.length;
  // Apenas deleta se a transação pertencer ao usuário logado
  transactions = transactions.filter(t => t._id !== id && t.userId === req.user._id.toString()); 

  if (transactions.length === initialLength) {
    return res.status(404).json({ message: 'Transação não encontrada ou você não tem permissão para deletá-la.' });
  }

  res.status(204).send(); // 204 No Content
});

module.exports = router;