import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
} from 'lucide-react';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="custom-tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="custom-tooltip-value" style={{ color: p.color || p.fill }}>
          {p.name}: ${p.value.toLocaleString()}
        </div>
      ))}
    </div>
  );
}

export default function InsightsPage() {
  const { transactions } = useAppContext();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');

    
    const categorySpending = {};
    expenses.forEach(t => {
      categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
    });

    const topCategories = Object.entries(categorySpending)
      .map(([name, amount]) => ({
        name,
        amount: Math.round(amount),
        fill: CATEGORIES[name]?.color || '#6366f1',
      }))
      .sort((a, b) => b.amount - a.amount);

    const highestCategory = topCategories[0] || { name: 'N/A', amount: 0 };

    
    const monthlyData = {};
    transactions.forEach(t => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[key]) monthlyData[key] = { income: 0, expenses: 0 };
      if (t.type === 'income') monthlyData[key].income += t.amount;
      else monthlyData[key].expenses += t.amount;
    });

    const sortedMonths = Object.keys(monthlyData).sort();
    const monthlyChart = sortedMonths.map(key => {
      const [year, month] = key.split('-');
      const name = new Date(year, month - 1).toLocaleString('en-US', { month: 'short' });
      return {
        name: `${name} '${year.slice(2)}`,
        Income: Math.round(monthlyData[key].income),
        Expenses: Math.round(monthlyData[key].expenses),
      };
    });

    
    const currentMonth = sortedMonths[sortedMonths.length - 1];
    const prevMonth = sortedMonths[sortedMonths.length - 2];
    const currentData = monthlyData[currentMonth] || { income: 0, expenses: 0 };
    const prevData = monthlyData[prevMonth] || { income: 0, expenses: 0 };

    const expenseChange = prevData.expenses
      ? ((currentData.expenses - prevData.expenses) / prevData.expenses * 100).toFixed(1)
      : 0;
    const incomeChange = prevData.income
      ? ((currentData.income - prevData.income) / prevData.income * 100).toFixed(1)
      : 0;

    
    const totalIncome = income.reduce((s, t) => s + t.amount, 0);
    const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
    const avgMonthlyExpense = totalExpenses / (sortedMonths.length || 1);

    
    const observations = [];

    observations.push({
      icon: AlertTriangle,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
      text: `Your highest spending category is <strong>${highestCategory.name}</strong> at $${highestCategory.amount.toLocaleString()}, accounting for ${((highestCategory.amount / totalExpenses) * 100).toFixed(1)}% of total expenses.`,
    });

    if (parseFloat(expenseChange) > 0) {
      observations.push({
        icon: ArrowUpRight,
        color: '#ef4444',
        bg: 'rgba(239, 68, 68, 0.12)',
        text: `Expenses went <strong>up ${Math.abs(expenseChange)}%</strong> compared to last month. Consider reviewing your spending in ${highestCategory.name}.`,
      });
    } else if (parseFloat(expenseChange) < 0) {
      observations.push({
        icon: ArrowDownRight,
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.12)',
        text: `Great job! Expenses went <strong>down ${Math.abs(expenseChange)}%</strong> compared to last month.`,
      });
    }

    if (parseFloat(incomeChange) > 0) {
      observations.push({
        icon: TrendingUp,
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.12)',
        text: `Income increased by <strong>${incomeChange}%</strong> this month. Keep up the momentum!`,
      });
    }

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;
    observations.push({
      icon: Zap,
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.12)',
      text: `Your overall savings rate is <strong>${savingsRate}%</strong>. ${parseFloat(savingsRate) >= 20 ? 'Excellent — above the recommended 20%!' : 'Try to aim for at least 20%.'}`,
    });

    if (topCategories.length > 2) {
      observations.push({
        icon: DollarSign,
        color: '#06b6d4',
        bg: 'rgba(6, 182, 212, 0.12)',
        text: `You spend across <strong>${topCategories.length} categories</strong>. Your top 3 are ${topCategories.slice(0, 3).map(c => c.name).join(', ')}.`,
      });
    }

    return {
      topCategories,
      highestCategory,
      monthlyChart,
      totalIncome,
      totalExpenses,
      avgMonthlyExpense,
      expenseChange,
      incomeChange,
      observations,
    };
  }, [transactions]);

  return (
    <div>
      <div className="page-header animate-fade-in-up">
        <h2 className="page-title">Financial Insights</h2>
        <p className="page-subtitle">Smart analysis of your spending patterns and financial health</p>
      </div>

      {}
      <div className="insights-grid">
        <div className="card animate-fade-in-up stagger-1">
          <div className="card-title">Highest Spending</div>
          <div className="insight-metric">
            <div className="insight-value" style={{ color: CATEGORIES[insights.highestCategory.name]?.color }}>
              {insights.highestCategory.name}
            </div>
            <div className="insight-label">
              ${insights.highestCategory.amount.toLocaleString()} total spent
            </div>
          </div>
        </div>

        <div className="card animate-fade-in-up stagger-2">
          <div className="card-title">Monthly Expenses Change</div>
          <div className="insight-metric">
            <div className="insight-value" style={{
              color: parseFloat(insights.expenseChange) > 0 ? 'var(--danger)' : 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {parseFloat(insights.expenseChange) > 0
                ? <ArrowUpRight size={20} />
                : <ArrowDownRight size={20} />}
              {Math.abs(insights.expenseChange)}%
            </div>
            <div className="insight-label">vs. previous month</div>
          </div>
        </div>

        <div className="card animate-fade-in-up stagger-3">
          <div className="card-title">Avg. Monthly Expense</div>
          <div className="insight-metric">
            <div className="insight-value">
              ${Math.round(insights.avgMonthlyExpense).toLocaleString()}
            </div>
            <div className="insight-label">
              across {insights.monthlyChart.length} months
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="insights-charts">
        <div className="card chart-card animate-fade-in-up stagger-4">
          <div className="card-title">Monthly Income vs Expenses</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={insights.monthlyChart} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
              <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card animate-fade-in-up stagger-5">
          <div className="card-title">Top Spending Categories</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={insights.topCategories.slice(0, 6)}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" horizontal={false} />
              <XAxis type="number" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false}
                tickFormatter={v => `$${v.toLocaleString()}`} />
              <YAxis type="category" dataKey="name" stroke="var(--text-tertiary)" fontSize={12}
                tickLine={false} axisLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" name="Amount" radius={[0, 4, 4, 0]} barSize={18}>
                {insights.topCategories.slice(0, 6).map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {}
      <div className="card animate-fade-in-up stagger-6">
        <div className="card-title">Smart Observations</div>
        <div className="observation-list">
          {insights.observations.map((obs, i) => {
            const Icon = obs.icon;
            return (
              <div key={i} className="observation-item">
                <div className="observation-icon" style={{ background: obs.bg, color: obs.color }}>
                  <Icon size={16} />
                </div>
                <div
                  className="observation-text"
                  dangerouslySetInnerHTML={{ __html: obs.text }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
