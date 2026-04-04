import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { initialTransactions } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'finance_dashboard_state';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...initialState,
        transactions: parsed.transactions || initialTransactions,
        role: parsed.role || 'admin',
        theme: parsed.theme || 'dark',
      };
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      transactions: state.transactions,
      role: state.role,
      theme: state.theme,
    }));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

const initialState = {
  transactions: initialTransactions,
  filters: {
    search: '',
    category: 'All',
    type: 'All',
    sortBy: 'date',
    sortOrder: 'desc',
  },
  role: 'admin',
  theme: 'dark',
  sidebarCollapsed: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
      };
    case 'SET_ROLE':
      return {
        ...state,
        role: action.payload,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, () => {
    return loadState() || initialState;
  });

  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  
  useEffect(() => {
    saveState(state);
  }, [state.transactions, state.role, state.theme]);

  const addTransaction = useCallback((transaction) => {
    const id = Math.max(...state.transactions.map(t => t.id), 0) + 1;
    dispatch({ type: 'ADD_TRANSACTION', payload: { ...transaction, id } });
  }, [state.transactions]);

  const editTransaction = useCallback((transaction) => {
    dispatch({ type: 'EDIT_TRANSACTION', payload: transaction });
  }, []);

  const deleteTransaction = useCallback((id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' });
  }, []);

  const setRole = useCallback((role) => {
    dispatch({ type: 'SET_ROLE', payload: role });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, []);

  
  const getFilteredTransactions = useCallback(() => {
    let result = [...state.transactions];
    const { search, category, type, sortBy, sortOrder } = state.filters;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.amount.toString().includes(q)
      );
    }

    if (category !== 'All') {
      result = result.filter(t => t.category === category);
    }

    if (type !== 'All') {
      result = result.filter(t => t.type === type);
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'description':
          comparison = a.description.localeCompare(b.description);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [state.transactions, state.filters]);

  const value = {
    ...state,
    addTransaction,
    editTransaction,
    deleteTransaction,
    setFilters,
    resetFilters,
    setRole,
    toggleTheme,
    toggleSidebar,
    getFilteredTransactions,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
