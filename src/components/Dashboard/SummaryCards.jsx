import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function SummaryCards() {
  const { transactions } = useAppContext();

  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;
    const savingsRate = income > 0 ? ((income - expenses) / income * 100) : 0;

    return { balance, income, expenses, savingsRate };
  }, [transactions]);

  const cards = [
    {
      label: 'Total Balance',
      value: formatCurrency(stats.balance),
      icon: Wallet,
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.12)',
      trend: '+12.5%',
      trendDir: 'up',
    },
    {
      label: 'Total Income',
      value: formatCurrency(stats.income),
      icon: TrendingUp,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.12)',
      trend: '+8.2%',
      trendDir: 'up',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(stats.expenses),
      icon: TrendingDown,
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.12)',
      trend: '+3.1%',
      trendDir: 'down',
    },
    {
      label: 'Savings Rate',
      value: `${stats.savingsRate.toFixed(1)}%`,
      icon: PiggyBank,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
      trend: '+2.4%',
      trendDir: 'up',
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`card summary-card animate-fade-in-up stagger-${i + 1}`}
          >
            <div
              className="summary-card-icon"
              style={{ background: card.bg, color: card.color }}
            >
              <Icon size={20} />
            </div>
            <div className="summary-card-label">{card.label}</div>
            <div className="summary-card-value">{card.value}</div>
            <div className={`summary-card-trend ${card.trendDir === 'up' ? 'trend-up' : 'trend-down'}`}>
              {card.trendDir === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {card.trend} vs last period
            </div>
          </div>
        );
      })}
    </div>
  );
}
