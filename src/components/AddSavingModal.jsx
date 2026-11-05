'use client';

import { useState } from 'react';
import { useSavings } from '../context/SavingsContext';

export default function AddSavingsModal({ goal, onClose }) {
  const { addContribution } = useSavings();
  const [amount, setAmount] = useState('');

  if (!goal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) return;

    addContribution(goal.id, numericAmount);
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Add Money to Goal</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold p-1"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Contributing towards <span className="font-semibold text-purple-700">{goal.title}</span> (Target: ₹{goal.targetAmount.toLocaleString('en-IN')})
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Amount to Add (₹)</label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Deposit Money
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
