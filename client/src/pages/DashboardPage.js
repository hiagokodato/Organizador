// Importe os novos hooks
import { useState, useEffect, useCallback, useMemo } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const DashboardPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({ description: '', amount: '', type: 'expense' });
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');

    const user = useMemo(() => {
        return token ? jwt_decode(token) : null;
    }, [token]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);

    const fetchTransactions = useCallback(async () => {
        try {
            const res = await api.get('/api/transactions');
            setTransactions(res.data);
        } catch (error) {
            console.error('Erro ao buscar transações', error);
            if (error.response && error.response.status === 401) {
                handleLogout();
            }
        }
    }, [handleLogout]);

    useEffect(() => {
        if (token) {
            fetchTransactions();
        } else {
            navigate('/login');
        }
    }, [token, navigate, fetchTransactions]); 

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Ativa o loading
        try {
            await api.post('/api/transactions', formData);
            fetchTransactions();
            setFormData({ description: '', amount: '', type: 'expense' });
        } catch (error) {
            alert('Erro ao adicionar transação');
        } finally {
            setLoading(false);
        }
    };
    
    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/transactions/${id}`);
            fetchTransactions();
        } catch (error) {
            alert('Erro ao deletar transação');
        }
    }

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIncome - totalExpense;

    // O JSX fica quase igual, apenas com a adição do `disabled` e texto do botão
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Dashboard de {user?.name || 'Usuário'}
                </h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
            </div>
            
            {/* Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-200 p-4 rounded-lg shadow"><h3 className="font-bold">Receita Total</h3><p>R$ {totalIncome.toFixed(2)}</p></div>
                <div className="bg-red-200 p-4 rounded-lg shadow"><h3 className="font-bold">Despesa Total</h3><p>R$ {totalExpense.toFixed(2)}</p></div>
                <div className="bg-blue-200 p-4 rounded-lg shadow"><h3 className="font-bold">Saldo</h3><p>R$ {balance.toFixed(2)}</p></div>
            </div>

            {/* Formulário de Nova Transação */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-4">Adicionar Nova Transação</h2>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <input type="text" name="description" placeholder="Descrição" value={formData.description} onChange={handleChange} className="p-2 border rounded flex-grow" required />
                    <input type="number" name="amount" placeholder="Valor (ex: 50.99)" value={formData.amount} onChange={handleChange} className="p-2 border rounded" required />
                    <select name="type" value={formData.type} onChange={handleChange} className="p-2 border rounded">
                        <option value="expense">Despesa</option>
                        <option value="income">Receita</option>
                    </select>
                    {/* NOVO: Botão com estado de loading */}
                    <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300">
                        {loading ? 'Adicionando...' : 'Adicionar'}
                    </button>
                </form>
            </div>

            {/* Lista de Transações */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h2 className="text-2xl font-bold mb-4">Histórico de Transações</h2>
                 <ul>
                     {transactions.map(t => (
                         <li key={t._id} className="flex justify-between items-center p-2 border-b">
                             <span>{t.description}</span>
                             <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                 {t.type === 'expense' && '-'}R$ {t.amount.toFixed(2)}
                             </span>
                             <button onClick={() => handleDelete(t._id)} className="text-red-500 hover:text-red-700">X</button>
                         </li>
                     ))}
                 </ul>
            </div>
        </div>
    );
};

export default DashboardPage;