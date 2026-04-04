import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RecentTransactions() {
  const { transactions } = useAppContext();
  const navigate = useNavigate();

  const recent = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);
  }, [transactions]);

  return (
    <div className="card animate-fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div className="card-title" style={{ marginBottom: 0 }}>Recent Transactions</div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('/transactions')}
          style={{ gap: '4px' }}
        >
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="recent-list">
        {recent.map(t => {
          const catColor = CATEGORIES[t.category]?.color || '#6366f1';
          return (
            <div key={t.id} className="recent-item">
              <div
                className="recent-item-icon"
                style={{ background: `${catColor}18`, color: catColor }}
              >
                <div className="category-dot" style={{ background: catColor, width: 10, height: 10 }} />
              </div>
              <div className="recent-item-info">
                <div className="recent-item-desc">{t.description}</div>
                <div className="recent-item-category">
                  {t.category} • {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
              <div className={`recent-item-amount ${t.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
                {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
