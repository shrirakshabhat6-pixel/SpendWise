"use client";

import Navbar from "@/components/Navbar";
import BudgetCard from "@/components/BudgetCard";
import SpendingChart from "@/components/SpendingChart";
import { useExpenses } from "@/context/ExpensesContext";
import { useBudget } from "@/context/BudgetContext";
import { useSavings } from "@/context/SavingsContext";

import {
  calculateTotalExpenses,
  calculateRemainingBudget,
  calculateCategoryExpenses,
} from "@/utils/Calculations";

export default function Home() {
  const { expenses } = useExpenses();
  const { budget, updateBudget } = useBudget();
  const { savingsGoals = [] } = useSavings() || {};

  const totalExpenses = calculateTotalExpenses(expenses);

  const remainingBudget = calculateRemainingBudget(budget, expenses);

  const categoryExpenses = calculateCategoryExpenses(expenses);

  const totalSavings = savingsGoals.reduce(
    (acc, goal) => acc + (Number(goal.currentAmount) || 0),
    0
  );

  const budgetUsage = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  const progressWidth = Math.min(budgetUsage, 100);

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">SpendWise Dashboard</h1>

        <div className="monthly-budget bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <label htmlFor="budget" className="text-sm font-semibold text-gray-700">
            Set Monthly Budget (₹):
          </label>

          <input
            id="budget"
            type="number"
            min="0"
            value={budget}
            onChange={(e) => updateBudget(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-purple-600"
          />
        </div>

        <div className="budget-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <BudgetCard title="Total Budget" amount={budget} />
          <BudgetCard title="Total Expenses" amount={totalExpenses} />
          <BudgetCard title="Remaining Budget" amount={remainingBudget} />
          <BudgetCard title="Total Savings" amount={totalSavings} />
        </div>

        <div className="budget-summary bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-gray-800">Budget Usage Summary</h2>
          <p className="text-sm text-gray-600 font-medium">
            Budget Used: {budgetUsage.toFixed(1)}%
          </p>

          <div className="usage-bar w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="usage-fill bg-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          <p className="text-sm font-semibold text-gray-700">
            {remainingBudget >= 0
              ? `You have ₹${remainingBudget.toLocaleString("en-IN")} remaining.`
              : `You have exceeded your budget by ₹${Math.abs(remainingBudget).toLocaleString("en-IN")}.`}
          </p>
        </div>

        <SpendingChart categoryExpenses={categoryExpenses} />
      </main>
    </>
  );
}