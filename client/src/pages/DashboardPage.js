// Importe os hooks necessários do React
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegação programática
import { jwtDecode } from 'jwt-decode'; // Importação CORRETA para a versão 4.x.x+
import api from '../services/api'; // Sua instância configurada do Axios
import { toast } from 'react-hot-toast'; // Importa o toast

const DashboardPage = () => {
    // Estados para gerenciar os dados e o UI
    const [transactions, setTransactions] = useState([]); // Lista de transações
    const [formData, setFormData] = useState({ description: '', amount: '', type: 'expense' }); // Dados do formulário
    const [loading, setLoading] = useState(false); // Estado de carregamento para o envio do formulário
    const [fetchLoading, setFetchLoading] = useState(true); // Estado de carregamento para a busca inicial de transações
    const navigate = useNavigate(); // Hook para navegação

    // Obtém o token do localStorage
    const token = localStorage.getItem('token');

    // Decodifica o token para obter os dados do usuário, memoizado para performance
    const user = useMemo(() => {
        // CORREÇÃO: Usando 'jwtDecode' (camelCase) como importado
        return token ? jwtDecode(token) : null;
    }, [token]);

    // Função de logout, memoizada para performance
    const handleLogout = useCallback(() => {
        localStorage.removeItem('token'); // Remove o token do localStorage
        toast.success('Você foi desconectado.'); // Notificação de logout
        navigate('/login'); // Redireciona para a página de login
    }, [navigate]);

    // Função para buscar as transações do backend, memoizada para performance
    const fetchTransactions = useCallback(async () => {
        setFetchLoading(true); // Ativa o estado de carregamento da busca
        try {
            const res = await api.get('/api/transactions'); // Faz a requisição GET para as transações
            setTransactions(res.data); // Atualiza o estado com as transações recebidas
        } catch (error) {
            console.error('Erro ao buscar transações', error);
            // Se o erro for 401 (Não Autorizado), redireciona para o login (token inválido/expirado)
            // Note: O interceptor do api.js também lida com isso globalmente, mas é bom ter aqui para contexto.
            if (error.response && error.response.status === 401) {
                toast.error('Sessão expirada ou inválida. Faça login novamente.'); // Notificação de sessão expirada
                handleLogout(); // Chama a função de logout
            } else {
                toast.error('Erro ao carregar transações.'); // Notificação de erro geral
            }
        } finally {
            setFetchLoading(false); // Desativa o estado de carregamento da busca
        }
    }, [handleLogout]);

    // Efeito para buscar transações quando o componente monta ou o token muda
    useEffect(() => {
        if (token) {
            fetchTransactions(); // Se houver token, busca as transações
        } else {
            navigate('/login'); // Se não houver token, redireciona para o login
        }
    }, [token, navigate, fetchTransactions]); // Dependências do useEffect

    // Lida com a mudança nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            // Converte o 'amount' para número flutuante, ou string vazia se inválido
            [name]: name === 'amount' ? parseFloat(value) || '' : value
        });
    };

    // Lida com o envio do formulário para adicionar nova transação
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o recarregamento da página

        // Validação básica do formulário antes de enviar
        if (!formData.description.trim() || !formData.amount || parseFloat(formData.amount) <= 0) {
            toast.error('Por favor, preencha a descrição e um valor positivo para a transação.'); // Notificação de validação
            return; // Impede o envio se a validação falhar
        }

        setLoading(true);
        const addToastId = toast.loading('Adicionando transação...'); // Toast de carregamento
        try {
            await api.post('/api/transactions', formData); // Envia os dados da nova transação
            setFormData({ description: '', amount: '', type: 'expense' }); // Limpa o formulário
            fetchTransactions(); // Recarrega a lista de transações para exibir a nova
            toast.success('Transação adicionada com sucesso!', { id: addToastId }); // Toast de sucesso
        } catch (error) {
            console.error('Erro ao adicionar transação', error);
            const errorMessage = error.response?.data?.message || 'Erro ao adicionar transação.';
            toast.error(errorMessage, { id: addToastId }); // Toast de erro
        } finally {
            setLoading(false);
        }
    };

    // Lida com a exclusão de uma transação
    const handleDelete = async (id) => {
        const deleteToastId = toast.loading('Deletando transação...'); // Toast de carregamento
        try {
            await api.delete(`/api/transactions/${id}`); // Envia a requisição DELETE
            fetchTransactions(); // Recarrega a lista de transações após a exclusão
            toast.success('Transação deletada com sucesso!', { id: deleteToastId }); // Toast de sucesso
        } catch (error) {
            console.error('Erro ao deletar transação', error);
            const errorMessage = error.response?.data?.message || 'Erro ao deletar transação.';
            toast.error(errorMessage, { id: deleteToastId }); // Toast de erro
        }
    };

    // Cálculos de saldo, receita e despesa total
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIncome - totalExpense;

    return (
        <div className="container mx-auto p-4">
            {/* Cabeçalho do Dashboard com nome do usuário e botão de Logout */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Dashboard de {user?.name || 'Usuário'}
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            {/* Resumo Financeiro (Receita, Despesa, Saldo) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-200 p-4 rounded-lg shadow">
                    <h3 className="font-bold">Receita Total</h3>
                    <p>R$ {totalIncome.toFixed(2)}</p>
                </div>
                <div className="bg-red-200 p-4 rounded-lg shadow">
                    <h3 className="font-bold">Despesa Total</h3>
                    <p>R$ {totalExpense.toFixed(2)}</p>
                </div>
                <div className="bg-blue-200 p-4 rounded-lg shadow">
                    <h3 className="font-bold">Saldo</h3>
                    <p>R$ {balance.toFixed(2)}</p>
                </div>
            </div>

            {/* Formulário de Nova Transação */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-4">Adicionar Nova Transação</h2>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        name="description"
                        placeholder="Descrição"
                        value={formData.description}
                        onChange={handleChange}
                        className="p-2 border rounded flex-grow"
                        required
                    />
                    <input
                        type="number"
                        name="amount"
                        placeholder="Valor (ex: 50.99)"
                        value={formData.amount}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        required
                    />
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="p-2 border rounded"
                    >
                        <option value="expense">Despesa</option>
                        <option value="income">Receita</option>
                    </select>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {loading ? 'Adicionando...' : 'Adicionar'}
                    </button>
                </form>
            </div>

            {/* Lista de Transações */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Histórico de Transações</h2>
                {fetchLoading ? (
                    <p>Carregando transações...</p>
                ) : transactions.length === 0 ? (
                    <p>Nenhuma transação encontrada. Adicione uma nova!</p>
                ) : (
                    <ul>
                        {transactions.map(t => (
                            <li key={t._id} className="flex justify-between items-center p-2 border-b">
                                <span>{t.description}</span>
                                <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                    {t.type === 'expense' && '-'}R$ {t.amount.toFixed(2)}
                                </span>
                                <button
                                    onClick={() => handleDelete(t._id)}
                                    className="text-red-500 hover:text-red-700 ml-4"
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;