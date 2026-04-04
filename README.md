# FinanceHub — Comprehensive Project Documentation

FinanceHub is a modern, responsive, and fully functional frontend application designed to mimic a real-world personal finance dashboard. It allows users to track expenses and income, view complex data visualizations, and generate smart insights about their spending patterns.

This document serves as a deep dive into the architecture, technology stack, file structure, and technical decisions made during the development of this project.

---

## 🛠️ Technology Stack Deep Dive

The project was built intentionally to demonstrate strong foundational frontend skills without over-relying on heavy abstraction libraries.

| Technology | Purpose & Usage in Project |
|------------|----------------------------|
| **React 18** | Used as the core UI library for building modular, reusable components. Leverages hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) heavily to optimize rendering and handle side-effects cleanly. |
| **Vite** | Chosen as the build tool and development server instead of Create React App. It provides hot module replacement (HMR), lightning-fast builds, and native ES module support. |
| **React Router v6** | Manages application routing (Dashboard, Transactions, Insights). Used for declarative routing and handling the layout wrapper across different pages. |
| **Vanilla CSS (No Frameworks)** | We intentionally avoided Tailwind, Bootstrap, or MUI. All styling is written in pure CSS (`index.css`) utilizing modern features like **CSS Custom Properties (Variables)** for building a design token system, theming, and responsive breakpoints. |
| **React Context API + useReducer** | Handles global state management. Instead of bulky libraries like Redux, we combine Context and `useReducer` to create a local, flux-like architecture that manages transactions, filters, roles, and themes. |
| **Recharts** | A highly customizable charting library built natively for React. Used to render the Area charts (Balance Trend), Pie/Donut charts (Spending Breakdown), and Bar charts (Monthly Comparisons). |
| **Lucide React** | Provides crisp, scalable SVG icons used throughout the sidebar, buttons, and insight observations. |
| **Local Storage API** | Browser-native storage used to persist application state across browser refreshes, ensuring data isn't lost. |

---

## 🏗️ Project Architecture & Folder Structure

The structural layout was designed for high scalability and separation of concerns.

```text
src/
├── assets/             # Static assets (favicons, etc.)
├── components/         # Reusable UI piece, scoped by domain
│   ├── Dashboard/      # Components specific to the Dashboard page
│   │   ├── BalanceTrend.jsx      # Area chart calculating income vs expense over time
│   │   ├── QuickStats.jsx        # Derived daily averages and max expenses
│   │   ├── RecentTransactions.jsx# Sliced array of recent history
│   │   ├── SpendingBreakdown.jsx # Donut chart grouping categories
│   │   └── SummaryCards.jsx      # Top-level metrics with animated counters
│   ├── Insights/       
│   │   └── InsightsPage.jsx      # Heavy data-crunching component generating text observations
│   ├── Layout/         
│   │   ├── Header.jsx            # Top bar with role dropdown and theme toggle
│   │   ├── Layout.jsx            # Wrapper establishing the CSS Grid/Flex main layout
│   │   └── Sidebar.jsx           # Collapsible navigation menu
│   └── Transactions/   
│       ├── TransactionFilters.jsx# Multi-select dropdowns and search inputs
│       ├── TransactionForm.jsx   # Controlled modal form with validation
│       └── TransactionList.jsx   # Paginated table with conditional action buttons
├── context/
│   └── AppContext.jsx  # The central nervous system of the app (State & Reducers)
├── data/
│   └── mockData.js     # Bootstraps the app with 50+ realistic temporal transactions
├── pages/
│   ├── DashboardPage.jsx         # Composes Dashboard components
│   └── TransactionsPage.jsx      # Composes Transaction components
├── App.jsx             # Declares routing paths and redirects
├── index.css           # Global design system, animations, theme tokens
└── main.jsx            # React root injection and Provider wrapping
```

---

## ⚙️ Core Technical Implementations

### 1. State Management (`AppContext.jsx`)
We utilize the `useReducer` hook inside a React Context to handle complex state mutations. The state object holds:
- The array of `transactions`.
- Current `filters` (search query, category, type, sorting rules).
- The current user `role` (admin/viewer).
- The active `theme` (dark/light).

**Why this approach?** By passing a `dispatch` function implicitly through custom hooks (`addTransaction`, `editTransaction`), components are decoupled from the reducer logic. The context also automatically syncs the entire state shape to `localStorage` via a `useEffect` hook whenever it mutates.

### 2. Data Filtering Algorithm
Inside `AppContext.jsx`, there is a derived data function called `getFilteredTransactions()`. This function:
1. Creates a shallow copy of transactions.
2. Applies a case-insensitive fuzzy text search across descriptions and categories.
3. Applies strict equality filters for category and type.
4. Uses a dynamic switch statement to sort the remaining array based on the `sortBy` criteria (amount, date, description) and reverses it based on `sortOrder`.
This ensures the UI is always reflecting the exact data the user is querying instantly.

### 3. Role-Based Access Control (RBAC Simulation)
The application handles simulated permissions on the frontend. The global state holds a `role` variable. 
- In `TransactionList.jsx`, the "Actions" column (Edit/Delete) is only rendered `if (role === 'admin')`.
- In `TransactionsPage.jsx`, the "Add Transaction" button is conditionally hidden for viewers. This demonstrates an understanding of conditional UI rendering based on auth states.

### 4. Advanced Theming (Dark/Light Mode)
Themes are not handled by swapping CSS classes on every element. Instead, we alter CSS root variables.
- `index.css` defines `:root` colors, but overrides them based on a data attribute: `[data-theme="dark"]` and `[data-theme="light"]`.
- The `AppContext` toggles this string. A `useEffect` hook dynamically injects `document.documentElement.setAttribute('data-theme', theme)`.
- As a result, the entire UI recalculates colors instantly and cleanly with CSS transitions.

### 5. Data Visualization Parsing
Rendering charts requires taking flat transaction data and transforming it.
- **SpendingBreakdown.jsx**: Uses `reduce` to aggregate amounts by category, sorts them, calculates percentage shares, and assigns specific HEX colors from our design tokens before feeding it to the Recharts `<PieChart>`.
- **InsightsPage.jsx**: Groups transactions via date string manipulation into a `YYYY-MM` Map, calculates month-over-month percentage changes, and generates conditionally rendered logic strings (e.g., dynamically saying "Expenses went up X%").

### 6. CSV Export Functionality
The application includes a raw JavaScript algorithm that converts JSON to a CSV blob. It pulls the currently filtered data, constructs a comma-separated string, creates a virtual URL blob, attaches it to an invisible `<a>` tag, programmatically clicks it, and immediately garbage collects the DOM node.

---

## 🚀 How to Run the Project Locally

To run this project on your local machine, ensure you have Node.js installed.

1. **Open your terminal** and navigate to this project's root directory.
2. **Install all necessary dependency packages:**
   ```bash
   npm install
   ```
3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
4. **Access the Application:** Open your browser and navigate to the local host URL provided in the terminal (by default, it is usually `http://localhost:5173`).
