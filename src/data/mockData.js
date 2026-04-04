
export const CATEGORIES = {
  Food: { color: '#f97316', icon: 'UtensilsCrossed' },
  Transportation: { color: '#06b6d4', icon: 'Car' },
  Shopping: { color: '#ec4899', icon: 'ShoppingBag' },
  Entertainment: { color: '#8b5cf6', icon: 'Gamepad2' },
  Bills: { color: '#ef4444', icon: 'Receipt' },
  Healthcare: { color: '#10b981', icon: 'Heart' },
  Education: { color: '#3b82f6', icon: 'GraduationCap' },
  Salary: { color: '#22c55e', icon: 'Briefcase' },
  Freelance: { color: '#14b8a6', icon: 'Laptop' },
  Investment: { color: '#a855f7', icon: 'TrendingUp' },
  Rent: { color: '#f43f5e', icon: 'Home' },
  Utilities: { color: '#eab308', icon: 'Zap' },
};

export const EXPENSE_CATEGORIES = ['Food', 'Transportation', 'Shopping', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Rent', 'Utilities'];
export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment'];

let idCounter = 1;
const t = (date, description, amount, category, type) => ({
  id: idCounter++,
  date,
  description,
  amount,
  category,
  type,
});

export const initialTransactions = [
  
  t('2025-10-01', 'Monthly Salary', 5200, 'Salary', 'income'),
  t('2025-10-02', 'Apartment Rent', 1400, 'Rent', 'expense'),
  t('2025-10-03', 'Grocery Shopping', 85.50, 'Food', 'expense'),
  t('2025-10-05', 'Electric Bill', 120, 'Utilities', 'expense'),
  t('2025-10-07', 'Gas Station', 45.00, 'Transportation', 'expense'),
  t('2025-10-10', 'Netflix Subscription', 15.99, 'Entertainment', 'expense'),
  t('2025-10-12', 'Freelance Web Project', 800, 'Freelance', 'income'),
  t('2025-10-14', 'New Running Shoes', 129.99, 'Shopping', 'expense'),
  t('2025-10-18', 'Dinner with Friends', 62.30, 'Food', 'expense'),
  t('2025-10-22', 'Doctor Visit', 150, 'Healthcare', 'expense'),
  t('2025-10-25', 'Online Course — React', 49.99, 'Education', 'expense'),
  t('2025-10-28', 'Internet Bill', 59.99, 'Bills', 'expense'),

  
  t('2025-11-01', 'Monthly Salary', 5200, 'Salary', 'income'),
  t('2025-11-02', 'Apartment Rent', 1400, 'Rent', 'expense'),
  t('2025-11-04', 'Grocery Shopping', 92.75, 'Food', 'expense'),
  t('2025-11-06', 'Uber Rides', 38.50, 'Transportation', 'expense'),
  t('2025-11-08', 'Movie Tickets', 28.00, 'Entertainment', 'expense'),
  t('2025-11-10', 'Phone Bill', 45.00, 'Bills', 'expense'),
  t('2025-11-13', 'Winter Jacket', 189.99, 'Shopping', 'expense'),
  t('2025-11-15', 'Freelance Design Work', 600, 'Freelance', 'income'),
  t('2025-11-18', 'Thanksgiving Dinner Supplies', 145.80, 'Food', 'expense'),
  t('2025-11-20', 'Gym Membership', 40.00, 'Healthcare', 'expense'),
  t('2025-11-23', 'Gas Bill', 85.00, 'Utilities', 'expense'),
  t('2025-11-26', 'Stock Dividend', 125.00, 'Investment', 'income'),
  t('2025-11-29', 'Black Friday Electronics', 349.99, 'Shopping', 'expense'),

  
  t('2025-12-01', 'Monthly Salary', 5200, 'Salary', 'income'),
  t('2025-12-02', 'Apartment Rent', 1400, 'Rent', 'expense'),
  t('2025-12-04', 'Grocery Shopping', 110.25, 'Food', 'expense'),
  t('2025-12-06', 'Holiday Gifts', 275.00, 'Shopping', 'expense'),
  t('2025-12-08', 'Electric Bill', 135.00, 'Utilities', 'expense'),
  t('2025-12-10', 'Spotify Premium', 10.99, 'Entertainment', 'expense'),
  t('2025-12-12', 'Year-end Bonus', 2000, 'Salary', 'income'),
  t('2025-12-15', 'Holiday Party Dinner', 88.50, 'Food', 'expense'),
  t('2025-12-18', 'Uber Rides', 52.00, 'Transportation', 'expense'),
  t('2025-12-22', 'Dental Checkup', 200, 'Healthcare', 'expense'),
  t('2025-12-25', 'Investment Deposit', 500, 'Investment', 'income'),
  t('2025-12-28', 'Internet Bill', 59.99, 'Bills', 'expense'),

  
  t('2026-01-01', 'Monthly Salary', 5400, 'Salary', 'income'),
  t('2026-01-02', 'Apartment Rent', 1400, 'Rent', 'expense'),
  t('2026-01-04', 'Grocery Shopping', 78.90, 'Food', 'expense'),
  t('2026-01-06', 'New Year Dinner', 95.00, 'Food', 'expense'),
  t('2026-01-08', 'Gas Station', 42.00, 'Transportation', 'expense'),
  t('2026-01-10', 'Streaming Services', 25.98, 'Entertainment', 'expense'),
  t('2026-01-13', 'Freelance Consulting', 950, 'Freelance', 'income'),
  t('2026-01-15', 'Winter Boots', 159.99, 'Shopping', 'expense'),
  t('2026-01-18', 'Phone Bill', 45.00, 'Bills', 'expense'),
  t('2026-01-22', 'Python Course', 39.99, 'Education', 'expense'),
  t('2026-01-25', 'Prescription Medicine', 65.00, 'Healthcare', 'expense'),
  t('2026-01-28', 'Electric Bill', 140.00, 'Utilities', 'expense'),

  
  t('2026-02-01', 'Monthly Salary', 5400, 'Salary', 'income'),
  t('2026-02-02', 'Apartment Rent', 1400, 'Rent', 'expense'),
  t('2026-02-04', 'Grocery Shopping', 88.30, 'Food', 'expense'),
  t('2026-02-07', 'Valentine Dinner', 120.00, 'Food', 'expense'),
  t('2026-02-09', 'Uber Rides', 35.50, 'Transportation', 'expense'),
  t('2026-02-11', 'Concert Tickets', 85.00, 'Entertainment', 'expense'),
  t('2026-02-14', 'Valentine Gift', 79.99, 'Shopping', 'expense'),
  t('2026-02-16', 'Freelance Logo Design', 450, 'Freelance', 'income'),
  t('2026-02-19', 'Gas Bill', 78.00, 'Utilities', 'expense'),
  t('2026-02-22', 'Stock Dividend', 150.00, 'Investment', 'income'),
  t('2026-02-25', 'Gym Membership', 40.00, 'Healthcare', 'expense'),
  t('2026-02-28', 'Internet Bill', 59.99, 'Bills', 'expense'),

  
  t('2026-03-01', 'Monthly Salary', 5400, 'Salary', 'income'),
  t('2026-03-02', 'Apartment Rent', 1400, 'Rent', 'expense'),
  t('2026-03-04', 'Grocery Shopping', 95.40, 'Food', 'expense'),
  t('2026-03-06', 'Bus Pass', 60.00, 'Transportation', 'expense'),
  t('2026-03-09', 'Gaming Subscription', 14.99, 'Entertainment', 'expense'),
  t('2026-03-11', 'Spring Clothing', 210.00, 'Shopping', 'expense'),
  t('2026-03-14', 'Freelance App Development', 1200, 'Freelance', 'income'),
  t('2026-03-17', 'Phone Bill', 45.00, 'Bills', 'expense'),
  t('2026-03-20', 'Eye Examination', 175, 'Healthcare', 'expense'),
  t('2026-03-23', 'AWS Certification Course', 99.99, 'Education', 'expense'),
  t('2026-03-26', 'Electric Bill', 115.00, 'Utilities', 'expense'),
  t('2026-03-29', 'Investment Deposit', 750, 'Investment', 'income'),
];

export const getNextId = () => {
  return Math.max(...initialTransactions.map(t => t.id), 0) + 1;
};
