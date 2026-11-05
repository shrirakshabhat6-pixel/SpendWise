
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SavingsContext = createContext();

export function SavingsProvider({ children }) {
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved goals when the app starts
  useEffect(() => {
    try {
      const saved = localStorage.getItem("spendwise_savings_goals");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setSavingsGoals(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to load savings goals:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save goals only AFTER they have finished loading
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        "spendwise_savings_goals",
        JSON.stringify(savingsGoals)
      );
    } catch (err) {
      console.error("Failed to save savings goals:", err);
    }
  }, [savingsGoals, isLoaded]);

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
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              currentAmount:
                Number(goal.currentAmount || 0) + Number(amount),
            }
          : goal
      )
    );
  };

  const deleteSavingsGoal = (goalId) => {
    setSavingsGoals((prev) =>
      prev.filter((goal) => goal.id !== goalId)
    );
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
