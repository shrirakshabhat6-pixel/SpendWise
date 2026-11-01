"use client";

import { useExpenses } from "../context/ExpensesContext";

function ExpensesList() {
  const { expenses, deleteExpense } = useExpenses();

  return (
    <div className="expenses-list">
      <h2>Your Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        expenses.map((expense) => (
          <div className="expense-item" key={expense.id}>
            <div>
              <h3>{expense.title}</h3>
              <p>Category: {expense.category}</p>
              <p>Date: {expense.date}</p>
            </div>

            <div>
              <h3>₹{expense.amount.toLocaleString("en-IN")}</h3>

              <button
                type="button"
                onClick={() => deleteExpense(expense.id)}
                aria-label={`Delete ${expense.title}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpensesList;