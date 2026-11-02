"use client";

import { useState } from "react";
import { useExpenses } from "../context/ExpensesContext";
import categories from "../data/categories";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function ExpenseForm() {
  const { addExpense } = useExpenses();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0] || "Food");
  const [date, setDate] = useState(getTodayDate);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const numericAmount = parseFloat(amount);

    if (
      !trimmedTitle ||
      isNaN(numericAmount) ||
      numericAmount <= 0 ||
      !date
    ) {
      alert("Please enter a valid expense name, positive amount, and date.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: trimmedTitle,
      amount: numericAmount,
      category,
      date,
    };

    addExpense(newExpense);

    // Reset form state
    setTitle("");
    setAmount("");
    setCategory(categories[0] || "Food");
    setDate(getTodayDate());
  }

  return (
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="expense-title">Expense Title</label>
          <input
            id="expense-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Grocery Shopping"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expense-amount">Amount (₹)</label>
          <input
            id="expense-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expense-category">Category</label>
          <select
            id="expense-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="expense-date">Date</label>
          <input
            id="expense-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;