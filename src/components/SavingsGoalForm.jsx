'use client';

import { useState } from 'react';
import { useSavings } from '../context/SavingsContext';

export default function SavingsGoalForm({ onClose }) {
  const { addSavingsGoal } = useSavings();
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    category: 'General',
    deadline: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.targetAmount) return;

    addSavingsGoal({
      title: formData.title.trim(),
      targetAmount: Number(formData.targetAmount),
      currentAmount: Number(formData.currentAmount || 0),
      category: formData.category,
      deadline: formData.deadline,
    });

    setFormData({ title: '', targetAmount: '', currentAmount: '', category: 'General', deadline: '' });
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-gray-800">Create New Savings Goal</h3>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Goal Title</label>
        <input
          type="text"
          placeholder="e.g. New Laptop, Emergency Fund"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Target Amount (₹)</label>
          <input
            type="number"
            min="1"
            placeholder="50000"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Initial Saved (₹)</label>
          <input
            type="number"
            min="0"
            placeholder="0"
            value={formData.currentAmount}
            onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-600"
          >
            <option>General</option>
            <option>Gadgets</option>
            <option>Travel</option>
            <option>Education</option>
            <option>Emergency</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Target Deadline</label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Add Goal
        </button>
      </div>
    </form>
  );
}