// server/routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importe seu modelo de usuário
const jwt = require('jsonwebtoken');

// Função auxiliar para gerar o token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expira em 1 hora
  });
};

// @route   POST /register
// @desc    Registrar novo usuário
// @access  Public
router.post('/register', async (req, res) => { // <-- AQUI DEVE SER /register
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'Usuário com este email já existe.' });
  }

  try {
    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao registrar usuário.' });
  }
});

// @route   POST /login
// @desc    Autenticar usuário e obter token
// @access  Public
router.post('/login', async (req, res) => { // <-- E AQUI DEVE SER /login
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Email ou senha inválidos.' });
  }
});

module.exports = router;