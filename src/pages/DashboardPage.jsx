import SummaryCards from '../components/Dashboard/SummaryCards';
import BalanceTrend from '../components/Dashboard/BalanceTrend';
import SpendingBreakdown from '../components/Dashboard/SpendingBreakdown';
import RecentTransactions from '../components/Dashboard/RecentTransactions';
import QuickStats from '../components/Dashboard/QuickStats';

export default function DashboardPage() {
  return (
    <div>
      <div className="page-header animate-fade-in-up stagger-1">
        <h2 className="page-title">Dashboard Overview</h2>
        <p className="page-subtitle">Welcome back! Here's what's happening with your finances.</p>
      </div>

      <SummaryCards />
      
      <div className="charts-grid">
        <BalanceTrend />
        <SpendingBreakdown />
      </div>

      <div className="dashboard-bottom">
        <RecentTransactions />
        <QuickStats />
      </div>
    </div>
  );
}
