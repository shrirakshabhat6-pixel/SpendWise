
"use client";

import { useState } from "react";
import { useExpenses } from "@/context/ExpensesContext";

export default function ExpenseForm() {
  const { addExpense } = useExpenses();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || Number(amount) <= 0 || !date) {
      alert("Please enter valid expense details");
      return;
    }

    addExpense({
      title,
      amount: Number(amount),
      category,
      date,
    });

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
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
          min="1"
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
