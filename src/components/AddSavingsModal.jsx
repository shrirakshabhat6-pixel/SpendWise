"use client";

import { useState } from "react";

export default function AddSavingsModal({
  goal,
  onSave,
  onClose,
}) {
  const [amount, setAmount] = useState("");

  if (!goal) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      alert("Please enter a valid savings amount.");
      return;
    }

    onSave(goal.id, value);
    onClose();
  };

  return (
    <div className="savings-modal-overlay">
      <form className="savings-modal" onSubmit={handleSubmit}>
        <button
          type="button"
          className="savings-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="savings-modal-icon">💰</div>

        <h2>Add to {goal.name}</h2>
        <p className="savings-muted">
          How much would you like to contribute?
        </p>

        <label htmlFor="contribution-amount">
          Contribution amount (₹)
        </label>

        <input
          id="contribution-amount"
          type="number"
          min="1"
          step="0.01"
          placeholder="Enter amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          autoFocus
          required
        />

        <button type="submit" className="savings-add-button">
          Save Contribution
        </button>

        <button
          type="button"
          className="savings-cancel-button"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}