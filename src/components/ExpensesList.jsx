
"use client";

import { useState } from "react";
import { useExpenses } from "@/context/ExpensesContext";

export default function ExpensesList() {
  const { expenses, deleteExpense, updateExpense } = useExpenses();

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  const handleEdit = (expense) => {
    setEditingId(expense.id);

    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  };

  const handleSave = (id) => {
    const numericAmount = Number(formData.amount);

    if (
      !formData.title.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      !formData.date
    ) {
      alert("Please enter valid expense details.");
      return;
    }

    updateExpense({
      id,
      title: formData.title.trim(),
      amount: numericAmount,
      category: formData.category,
      date: formData.date,
    });

    setEditingId(null);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      filter === "All" || expense.category === filter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="expenses-list">
      <h2>All Expenses</h2>

      <div className="expense-filters">
        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Education</option>
          <option>Healthcare</option>
        </select>
      </div>

      {filteredExpenses.length === 0 ? (
        <p>No matching expenses found.</p>
      ) : (
        filteredExpenses.map((expense) => (
          <div className="expense-item" key={expense.id}>
            {editingId === expense.id ? (
              <div className="edit-expense">
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />

                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Bills</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                </select>

                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />

                <button onClick={() => handleSave(expense.id)}>
                  Save
                </button>

                <button onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div>
                  <h3>{expense.title}</h3>
                  <p>{expense.category} | {expense.date}</p>
                </div>

                <div className="expense-actions">
                  <strong>
                    ₹{Number(expense.amount).toLocaleString("en-IN")}
                  </strong>

                  <button onClick={() => handleEdit(expense)}>
                    Edit
                  </button>

                  <button onClick={() => deleteExpense(expense.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
