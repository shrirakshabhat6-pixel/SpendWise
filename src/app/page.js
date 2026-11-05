
"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import BudgetCard from "@/components/BudgetCard";
import SpendingChart from "@/components/SpendingChart";
import SavingsGoalForm from "@/components/SavingsGoalForm";
import AddSavingsModal from "@/components/AddSavingModal";

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

  const {
    savingsGoals = [],
    deleteSavingsGoal,
  } = useSavings();

  const [showGoalForm, setShowGoalForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

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

        <h1 className="text-2xl font-bold text-gray-800">
          SpendWise Dashboard
        </h1>

        {/* Monthly Budget */}
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

        {/* Summary Cards */}
        <div className="budget-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <BudgetCard title="Total Budget" amount={budget} />
          <BudgetCard title="Total Expenses" amount={totalExpenses} />
          <BudgetCard title="Remaining Budget" amount={remainingBudget} />
          <BudgetCard title="Total Savings" amount={totalSavings} />
        </div>

        {/* Budget Usage */}
        <div className="budget-summary bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-gray-800">
            Budget Usage Summary
          </h2>

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

        {/* Spending Chart */}
        <SpendingChart categoryExpenses={categoryExpenses} />

        {/* Savings Goals */}
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-5">

          <div className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Savings Goals
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Track your progress towards your financial goals.
              </p>
            </div>

            <button
              onClick={() => setShowGoalForm(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
            >
              + Create Goal
            </button>
          </div>

          {savingsGoals.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl">
              <p className="text-gray-600 font-medium">
                No savings goals yet.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Create your first goal to start saving!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savingsGoals.map((goal) => {
                const target = Number(goal.targetAmount) || 0;
                const current = Number(goal.currentAmount) || 0;

                const progress =
                  target > 0
                    ? Math.min((current / target) * 100, 100)
                    : 0;

                return (
                  <div
                    key={goal.id}
                    className="border border-gray-200 rounded-xl p-5 space-y-4"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {goal.title}
                        </h3>
                        <p className="text-xs text-purple-600 mt-1">
                          {goal.category}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteSavingsGoal(goal.id)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Saved</span>
                      <span className="font-semibold text-gray-800">
                        ₹{current.toLocaleString("en-IN")} / ₹
                        {target.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{progress.toFixed(1)}% completed</span>
                      {goal.deadline && (
                        <span>Deadline: {goal.deadline}</span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedGoal(goal)}
                      className="w-full bg-purple-50 text-purple-700 py-2 rounded-lg text-sm font-semibold hover:bg-purple-100 transition-colors"
                    >
                      + Add Money
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Create Goal Form */}
        {showGoalForm && (
          <div className="bg-black/30 fixed inset-0 z-40 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-2">
              <SavingsGoalForm
                onClose={() => setShowGoalForm(false)}
              />
            </div>
          </div>
        )}

        {/* Add Money Modal */}
        {selectedGoal && (
          <AddSavingsModal
            goal={selectedGoal}
            onClose={() => setSelectedGoal(null)}
          />
        )}

      </main>
    </>
  );
}
