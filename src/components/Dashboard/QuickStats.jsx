import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function QuickStats() {
  const { transactions } = useAppContext();

  const stats = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
    const days = new Set(transactions.map(t => t.date)).size || 1;
    const avgDaily = totalExpense / days;
    const largest = expenses.length
      ? expenses.reduce((max, t) => (t.amount > max.amount ? t : max), expenses[0])
      : null;
    const totalTransactions = transactions.length;

    return {
      avgDaily: `$${Math.round(avgDaily)}`,
      largest: largest ? `$${largest.amount.toLocaleString()}` : '$0',
      total: totalTransactions,
    };
  }, [transactions]);

  return (
    <div className="card animate-fade-in-up">
      <div className="card-title">Quick Stats</div>
      <div className="quick-stats">
        <div className="quick-stat-item">
          <div className="quick-stat-value">{stats.avgDaily}</div>
          <div className="quick-stat-label">Avg. Daily Spend</div>
        </div>
        <div className="quick-stat-item">
          <div className="quick-stat-value">{stats.largest}</div>
          <div className="quick-stat-label">Largest Expense</div>
        </div>
        <div className="quick-stat-item">
          <div className="quick-stat-value">{stats.total}</div>
          <div className="quick-stat-label">Total Transactions</div>
        </div>
      </div>
    </div>
  );
}
