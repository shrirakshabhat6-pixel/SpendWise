
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BudgetCard from "@/components/BudgetCard";
import SpendingChart from "@/components/SpendingChart";
import { useExpenses } from "@/context/ExpensesContext";

import {
  calculateTotalExpenses,
  calculateRemainingBudget,
  calculateCategoryExpenses,
} from "@/utils/Calculations";

export default function Home() {
  const [totalBudget, setTotalBudget] = useState(10000);
  const [budgetLoaded, setBudgetLoaded] = useState(false);

  const { expenses } = useExpenses();

  // Load saved budget
  useEffect(() => {
    const savedBudget = localStorage.getItem("spendwise-budget");

    if (savedBudget !== null) {
      const parsedBudget = Number(savedBudget);

      if (Number.isFinite(parsedBudget) && parsedBudget >= 0) {
        setTotalBudget(parsedBudget);
      }
    }

    setBudgetLoaded(true);
  }, []);

  // Save budget whenever it changes
  useEffect(() => {
    if (budgetLoaded) {
      localStorage.setItem("spendwise-budget", totalBudget);
    }
  }, [totalBudget, budgetLoaded]);

  const totalExpenses = calculateTotalExpenses(expenses);
  const remainingBudget = calculateRemainingBudget(
    totalBudget,
    expenses
  );
  const categoryExpenses = calculateCategoryExpenses(expenses);

  const budgetUsage =
    totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

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
            value={totalBudget}
            onChange={(e) =>
              setTotalBudget(Math.max(0, Number(e.target.value)))
            }
          />
        </div>

        <div className="budget-container">
          <BudgetCard title="Total Budget" amount={totalBudget} />
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
