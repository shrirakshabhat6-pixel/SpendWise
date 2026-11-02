"use client";

import { useExpenses } from "../context/ExpensesContext";

function ExpensesList() {
  const { expenses, deleteExpense } = useExpenses();

  // Sort expenses by date descending (newest first)
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="expenses-list-container">
      <h2>Recent Expenses</h2>

      {sortedExpenses.length === 0 ? (
        <p className="empty-message">No expenses logged yet. Add one above!</p>
      ) : (
        <div className="expenses-grid">
          {sortedExpenses.map((expense) => (
            <div className="expense-card" key={expense.id}>
              <div className="expense-details">
                <h3 className="expense-title">{expense.title}</h3>
                <span className="expense-category">{expense.category}</span>
                <span className="expense-date">{expense.date}</span>
              </div>

              <div className="expense-action">
                <span className="expense-amount">
                  ₹{Number(expense.amount).toLocaleString("en-IN")}
                </span>

                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => deleteExpense(expense.id)}
                  aria-label={`Delete ${expense.title}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpensesList;