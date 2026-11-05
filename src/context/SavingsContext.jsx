"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SavingsContext = createContext();

export function SavingsProvider({ children }) {
  const [savingsGoals, setSavingsGoals] = useState([]);

  // Load savings goals from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("spendwise_savings_goals");
    if (saved) {
      try {
        setSavingsGoals(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse savings goals from localStorage", err);
      }
    }
  }, []);

  // Save savings goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("spendwise_savings_goals", JSON.stringify(savingsGoals));
  }, [savingsGoals]);

  const addSavingsGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setSavingsGoals((prev) => [newGoal, ...prev]);
  };

  const addContribution = (goalId, amount) => {
    setSavingsGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            currentAmount: Number(goal.currentAmount || 0) + Number(amount),
          };
        }
        return goal;
      })
    );
  };

  const deleteSavingsGoal = (goalId) => {
    setSavingsGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  };

  return (
    <SavingsContext.Provider
      value={{
        savingsGoals,
        addSavingsGoal,
        addContribution,
        deleteSavingsGoal,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
}

export function useSavings() {
  return useContext(SavingsContext);
}