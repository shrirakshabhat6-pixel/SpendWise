
"use client";

import Navbar from "@/components/Navbar";
import BudgetCard from "@/components/BudgetCard";
import SpendingChart from "@/components/SpendingChart";
import { useExpenses } from "@/context/ExpensesContext";
import { useBudget } from "@/context/BudgetContext";

import {
  calculateTotalExpenses,
  calculateRemainingBudget,
  calculateCategoryExpenses,
} from "@/utils/Calculations";

export default function Home() {
  const { expenses } = useExpenses();
  const { budget, updateBudget } = useBudget();

  const totalExpenses = calculateTotalExpenses(expenses);

  const remainingBudget = calculateRemainingBudget(
    budget,
    expenses
  );

  const categoryExpenses = calculateCategoryExpenses(expenses);

  const budgetUsage =
    budget > 0 ? (totalExpenses / budget) * 100 : 0;

  const progressWidth = Math.min(budgetUsage, 100);

  return (
    <>
      <Navbar />

      <main>
        <h1>SpendWise Dashboard</h1>

        <div className="monthly-budget">
          <label htmlFor="budget">Set Monthly Budget (₹)</label>

          <input
            id="budget"
            type="number"
            min="0"
            value={budget}
            onChange={(e) => updateBudget(e.target.value)}
          />
        </div>

        <div className="budget-container">
          <BudgetCard title="Total Budget" amount={budget} />
          <BudgetCard title="Total Expenses" amount={totalExpenses} />
          <BudgetCard title="Remaining Budget" amount={remainingBudget} />
        </div>

        <div className="budget-summary">
          <h2>Budget Usage Summary</h2>
          <p>Budget Used: {budgetUsage.toFixed(1)}%</p>

          <div className="usage-bar">
            <div
              className="usage-fill"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          <p>
            {remainingBudget >= 0
              ? `You have ₹${remainingBudget} remaining.`
              : `You have exceeded your budget by ₹${Math.abs(remainingBudget)}.`}
          </p>
        </div>

        <SpendingChart categoryExpenses={categoryExpenses} />
      </main>
    </>
  );
}
