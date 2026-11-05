"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const SavingsContext = createContext(null);

export function SavingsProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [monthlyTarget, setMonthlyTarget] = useState(10000);
  const [loaded, setLoaded] = useState(false);

  // Load saved data once when the app starts
  useEffect(() => {
    try {
      const savedGoals = localStorage.getItem("spendwise-savings-goals");
      const savedTarget = localStorage.getItem("spendwise-monthly-savings-target");

      if (savedGoals) setGoals(JSON.parse(savedGoals));
      if (savedTarget) setMonthlyTarget(Number(savedTarget));
    } catch (error) {
      console.error("Unable to load savings data:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  // Save data whenever it changes after initial loading
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "spendwise-savings-goals",
      JSON.stringify(goals)
    );

    localStorage.setItem(
      "spendwise-monthly-savings-target",
      String(monthlyTarget)
    );
  }, [goals, monthlyTarget, loaded]);

  const addGoal = (goalData) => {
    const newGoal = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: goalData.name,
      category: goalData.category,
      targetAmount: Number(goalData.targetAmount),
      targetDate: goalData.targetDate || "",
      contributions: [],
      createdAt: new Date().toISOString(),
    };

    setGoals((previous) => [...previous, newGoal]);
  };

  const deleteGoal = (goalId) => {
    setGoals((previous) =>
      previous.filter((goal) => goal.id !== goalId)
    );
  };

  const addContribution = (goalId, amount) => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return;
    }

    setGoals((previous) =>
      previous.map((goal) => {
        if (goal.id !== goalId) return goal;

        return {
          ...goal,
          contributions: [
            ...(goal.contributions || []),
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              amount: numericAmount,
              date: new Date().toISOString(),
            },
          ],
        };
      })
    );
  };

  const updateMonthlyTarget = (amount) => {
    const numericAmount = Number(amount);

    if (Number.isFinite(numericAmount) && numericAmount >= 0) {
      setMonthlyTarget(numericAmount);
    }
  };

  return (
    <SavingsContext.Provider
      value={{
        goals,
        monthlyTarget,
        addGoal,
        deleteGoal,
        addContribution,
        updateMonthlyTarget,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
}

export function useSavings() {
  const context = useContext(SavingsContext);

  if (!context) {
    throw new Error("useSavings must be used inside SavingsProvider");
  }

  return context;
}