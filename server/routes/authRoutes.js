const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Função auxiliar para gerar o token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expira em 1 hora
  });
};

// @route   POST /api/auth/register
// @desc    Registrar novo usuário
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validação básica
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

// @route   POST /api/auth/login
// @desc    Autenticar usuário e obter token
// @access  Public
router.post('/login', async (req, res) => {
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