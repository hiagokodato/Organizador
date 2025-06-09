const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

exports.addTransaction = async (req, res) => {
    const { description, amount, type } = req.body;
    try {
        const newTransaction = new Transaction({
            description,
            amount,
            type,
            user: req.user.id,
        });
        const transaction = await newTransaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: 'Dados inválidos' });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transação não encontrada' });
        if (transaction.user.toString() !== req.user.id) return res.status(401).json({ message: 'Não autorizado' });

        transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transação não encontrada' });
        if (transaction.user.toString() !== req.user.id) return res.status(401).json({ message: 'Não autorizado' });

        await transaction.deleteOne();
        res.json({ message: 'Transação removida' });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};