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
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(getTodayDate);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const numericAmount = Number(amount);

    if (
      !trimmedTitle ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      !date
    ) {
      alert("Please enter a valid expense name, amount, and date.");
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

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(getTodayDate());
  }

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="expense-title">Expense Name</label>
          <input
            id="expense-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter expense name"
            required
          />
        </div>

        <div>
          <label htmlFor="expense-amount">Amount (₹)</label>
          <input
            id="expense-amount"
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="expense-category">Category</label>
          <select
            id="expense-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="expense-date">Date</label>
          <input
            id="expense-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;