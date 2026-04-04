import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../data/mockData';
import { X } from 'lucide-react';

const emptyForm = {
  date: new Date().toISOString().split('T')[0],
  description: '',
  amount: '',
  category: 'Food',
  type: 'expense',
};

export default function TransactionForm({ isOpen, onClose, editData }) {
  const { addTransaction, editTransaction } = useAppContext();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm({
        date: editData.date,
        description: editData.description,
        amount: editData.amount.toString(),
        category: editData.category,
        type: editData.type,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editData, isOpen]);

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  
  useEffect(() => {
    if (!categories.includes(form.category)) {
      setForm(f => ({ ...f, category: categories[0] }));
    }
  }, [form.type]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!form.description.trim()) errs.description = 'Required';
    if (!form.amount || parseFloat(form.amount) <= 0) errs.amount = 'Enter a valid amount';
    if (!form.date) errs.date = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const transaction = {
      date: form.date,
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
    };

    if (editData) {
      editTransaction({ ...transaction, id: editData.id });
    } else {
      addTransaction(transaction);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {editData ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {}
            <div className="input-group">
              <label className="input-label">Type</label>
              <div className="role-switcher" style={{ width: '100%' }}>
                <button
                  type="button"
                  className={`role-option ${form.type === 'expense' ? 'active' : ''}`}
                  onClick={() => setForm(f => ({ ...f, type: 'expense' }))}
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  Expense
                </button>
                <button
                  type="button"
                  className={`role-option ${form.type === 'income' ? 'active' : ''}`}
                  onClick={() => setForm(f => ({ ...f, type: 'income' }))}
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  Income
                </button>
              </div>
            </div>

            {}
            <div className="input-group">
              <label className="input-label">Description</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Grocery Shopping"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
              {errors.description && (
                <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.description}</span>
              )}
            </div>

            {}
            <div className="input-group">
              <label className="input-label">Amount ($)</label>
              <input
                type="number"
                className="input"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              />
              {errors.amount && (
                <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.amount}</span>
              )}
            </div>

            {}
            <div className="input-group">
              <label className="input-label">Category</label>
              <select
                className="select"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                style={{ width: '100%' }}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {}
            <div className="input-group">
              <label className="input-label">Date</label>
              <input
                type="date"
                className="input"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
              {errors.date && (
                <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.date}</span>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editData ? 'Update' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
