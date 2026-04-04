import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="custom-tooltip">
      <div className="custom-tooltip-label">{data.name}</div>
      <div className="custom-tooltip-value" style={{ color: data.payload.fill }}>
        ${data.value.toLocaleString()} ({data.payload.percent}%)
      </div>
    </div>
  );
}

function CustomLegend({ payload }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', justifyContent: 'center', paddingTop: '8px' }}>
      {payload.map((entry, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: entry.color,
              flexShrink: 0,
            }}
          />
          <span style={{ color: 'var(--text-secondary)' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function SpendingBreakdown() {
  const { transactions } = useAppContext();

  const chartData = useMemo(() => {
    const categoryTotals = {};
    let total = 0;

    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        total += t.amount;
      });

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({
        name,
        value: Math.round(value),
        fill: CATEGORIES[name]?.color || '#6366f1',
        percent: ((value / total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="card chart-card animate-fade-in-up stagger-6">
      <div className="card-title">Spending Breakdown</div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
