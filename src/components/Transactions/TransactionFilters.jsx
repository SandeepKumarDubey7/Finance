import { useAppContext } from '../../context/AppContext';
import { CATEGORIES, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../data/mockData';
import { Search, X } from 'lucide-react';

const allCategories = ['All', ...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export default function TransactionFilters() {
  const { filters, setFilters, resetFilters } = useAppContext();
  const hasFilters = filters.search || filters.category !== 'All' || filters.type !== 'All';

  return (
    <div className="filters-bar animate-fade-in-up">
      <div className="search-input-wrapper">
        <Search size={16} />
        <input
          type="text"
          className="search-input"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={e => setFilters({ search: e.target.value })}
        />
      </div>

      <div className="filters-group">
        <select
          className="select"
          value={filters.category}
          onChange={e => setFilters({ category: e.target.value })}
        >
          {allCategories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="select"
          value={filters.type}
          onChange={e => setFilters({ type: e.target.value })}
        >
          <option value="All">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="select"
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={e => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            setFilters({ sortBy, sortOrder });
          }}
        >
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="amount-desc">Amount (High→Low)</option>
          <option value="amount-asc">Amount (Low→High)</option>
          <option value="category-asc">Category (A→Z)</option>
        </select>

        {hasFilters && (
          <button className="btn btn-ghost btn-sm" onClick={resetFilters}>
            <X size={14} /> Clear
          </button>
        )}
      </div>
    </div>
  );
}
