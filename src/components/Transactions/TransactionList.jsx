import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { Pencil, Trash2 } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function TransactionList({ onEdit }) {
  const { getFilteredTransactions, deleteTransaction, role } = useAppContext();
  const [page, setPage] = useState(1);

  const filtered = getFilteredTransactions();
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (filtered.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="empty-state-title">No transactions found</div>
          <div className="empty-state-desc">
            Try adjusting your filters or add a new transaction.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              {role === 'admin' && <th style={{ textAlign: 'center' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.map(t => {
              const catColor = CATEGORIES[t.category]?.color || '#6366f1';
              return (
                <tr key={t.id}>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    {new Date(t.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td style={{ fontWeight: 500 }}>{t.description}</td>
                  <td>
                    <span
                      className="category-tag"
                      style={{ background: `${catColor}15`, color: catColor }}
                    >
                      <span className="category-dot" style={{ background: catColor }} />
                      {t.category}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
                      {t.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td
                    style={{
                      textAlign: 'right',
                      fontWeight: 600,
                      color: t.type === 'income' ? 'var(--income-color)' : 'var(--expense-color)',
                    }}
                  >
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                  {role === 'admin' && (
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                        <button
                          className="btn btn-ghost btn-icon btn-sm"
                          title="Edit"
                          onClick={() => onEdit(t)}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="btn btn-danger btn-icon btn-sm"
                          title="Delete"
                          onClick={() => {
                            if (window.confirm('Delete this transaction?')) {
                              deleteTransaction(t.id);
                            }
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .reduce((acc, p, i, arr) => {
              if (i > 0 && p - arr[i - 1] > 1) {
                acc.push('...' + p);
              }
              acc.push(p);
              return acc;
            }, [])
            .map(p => {
              if (typeof p === 'string') {
                return <span key={p} style={{ color: 'var(--text-tertiary)', padding: '0 4px' }}>…</span>;
              }
              return (
                <button
                  key={p}
                  className={`pagination-btn ${page === p ? 'active' : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              );
            })}
          <button
            className="pagination-btn"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
