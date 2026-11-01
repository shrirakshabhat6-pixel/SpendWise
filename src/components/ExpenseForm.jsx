
"use client";

import { useState } from "react";
import { useExpenses } from "@/context/ExpensesContext";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function ExpenseForm() {
  const { addExpense } = useExpenses();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(getTodayDate);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const numericAmount = Number(amount);

    if (
      !trimmedTitle ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      !date
    ) {
      alert("Please enter valid expense details.");
      return;
    }

    addExpense({
      title: trimmedTitle,
      amount: numericAmount,
      category,
      date,
    });

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(getTodayDate());
  };

  return (
    <div className="expense-form">
      <h2>Add New Expense</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount (₹)"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}
