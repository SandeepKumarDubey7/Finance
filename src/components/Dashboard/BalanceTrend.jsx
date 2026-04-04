import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="custom-tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="custom-tooltip-value" style={{ color: p.color }}>
          {p.name}: ${p.value.toLocaleString()}
        </div>
      ))}
    </div>
  );
}

export default function BalanceTrend() {
  const { transactions } = useAppContext();

  const chartData = useMemo(() => {
    const monthlyMap = {};

    transactions.forEach(t => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyMap[key]) {
        monthlyMap[key] = { income: 0, expenses: 0 };
      }
      if (t.type === 'income') {
        monthlyMap[key].income += t.amount;
      } else {
        monthlyMap[key].expenses += t.amount;
      }
    });

    const sortedKeys = Object.keys(monthlyMap).sort();
    let balance = 0;

    return sortedKeys.map(key => {
      const d = monthlyMap[key];
      balance += d.income - d.expenses;
      const [year, month] = key.split('-');
      const monthName = new Date(year, month - 1).toLocaleString('en-US', { month: 'short' });
      return {
        name: `${monthName} ${year.slice(2)}`,
        Income: Math.round(d.income),
        Expenses: Math.round(d.expenses),
        Balance: Math.round(balance),
      };
    });
  }, [transactions]);

  return (
    <div className="card chart-card animate-fade-in-up stagger-5">
      <div className="card-title">Balance Trend</div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
          <XAxis
            dataKey="name"
            stroke="var(--text-tertiary)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="var(--text-tertiary)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="Income"
            stroke="#10b981"
            fill="url(#incomeGrad)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="Balance"
            stroke="#6366f1"
            fill="url(#balanceGrad)"
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
