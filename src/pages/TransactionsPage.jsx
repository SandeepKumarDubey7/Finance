import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TransactionFilters from '../components/Transactions/TransactionFilters';
import TransactionList from '../components/Transactions/TransactionList';
import TransactionForm from '../components/Transactions/TransactionForm';
import { Plus, Download } from 'lucide-react';

export default function TransactionsPage() {
  const { role, getFilteredTransactions } = useAppContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  const exportData = () => {
    const data = getFilteredTransactions();
    if (data.length === 0) return;

    
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...data.map(t => [
        t.date,
        `"${t.description.replace(/"/g, '""')}"`,
        t.category,
        t.type,
        t.amount
      ].join(','))
    ].join('\n');

    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `transactions_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCount = getFilteredTransactions().length;

  return (
    <div>
      <div className="page-header animate-fade-in-up stagger-1">
        <h2 className="page-title">Transactions</h2>
        <p className="page-subtitle">View, search, and manage your financial activity.</p>
      </div>

      <TransactionFilters />

      <div className="card animate-fade-in-up stagger-2">
        <div className="transactions-header">
          <div className="transactions-count">
            Showing {filteredCount} transaction{filteredCount !== 1 ? 's' : ''}
          </div>
          <div className="transactions-actions">
            <button className="btn btn-secondary btn-sm" onClick={exportData} disabled={filteredCount === 0}>
              <Download size={16} /> Export CSV
            </button>
            {role === 'admin' && (
              <button className="btn btn-primary btn-sm" onClick={() => setIsFormOpen(true)}>
                <Plus size={16} /> Add Transaction
              </button>
            )}
          </div>
        </div>

        <TransactionList onEdit={handleEdit} />
      </div>

      {role === 'admin' && (
        <TransactionForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          editData={editingTransaction}
        />
      )}
    </div>
  );
}
