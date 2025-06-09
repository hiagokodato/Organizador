const express = require('express');
const router = express.Router();
const {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionController');
const auth = require('../middleware/authMiddleware');

router.route('/').get(auth, getTransactions).post(auth, addTransaction);
router.route('/:id').put(auth, updateTransaction).delete(auth, deleteTransaction);

module.exports = router;