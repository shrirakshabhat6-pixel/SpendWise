"use client";

import { useState } from "react";

const categories = [
  "Vacation",
  "Phone",
  "Laptop",
  "College Fees",
  "Emergency Fund",
  "Vehicle",
  "Home",
  "Other",
];

export default function SavingsGoalForm({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vacation");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || Number(targetAmount) <= 0) {
      alert("Enter a goal name and a valid target amount.");
      return;
    }

    onAdd({
      name: name.trim(),
      category,
      targetAmount: Number(targetAmount),
      targetDate,
    });

    setName("");
    setCategory("Vacation");
    setTargetAmount("");
    setTargetDate("");
  };

  return (
    <form className="savings-form" onSubmit={handleSubmit}>
      <h2>Create a Savings Goal</h2>
      <p className="savings-muted">
        Decide what you want to save for and set your target.
      </p>

      <label htmlFor="goal-name">Goal name</label>
      <input
        id="goal-name"
        type="text"
        placeholder="Example: Buy a new laptop"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <label htmlFor="goal-category">Category</label>
      <select
        id="goal-category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label htmlFor="goal-amount">Target amount (₹)</label>
      <input
        id="goal-amount"
        type="number"
        min="1"
        placeholder="Example: 50000"
        value={targetAmount}
        onChange={(event) => setTargetAmount(event.target.value)}
        required
      />

      <label htmlFor="goal-date">Target date (optional)</label>
      <input
        id="goal-date"
        type="date"
        min={new Date().toISOString().split("T")[0]}
        value={targetDate}
        onChange={(event) => setTargetDate(event.target.value)}
      />

      <div className="savings-form-actions">
        <button type="submit" className="savings-add-button">
          Create Goal
        </button>

        <button
          type="button"
          className="savings-cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}