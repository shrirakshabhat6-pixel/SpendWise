
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { saveData, getData } from "../utils/Storage";

const BudgetContext = createContext(null);

export function BudgetProvider({ children }) {
  const [budget, setBudget] = useState(10000);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved budget
  useEffect(() => {
    try {
      const savedBudget = getData("spendwise-budget", 10000);
      const numericBudget = Number(savedBudget);

      if (Number.isFinite(numericBudget) && numericBudget >= 0) {
        setBudget(numericBudget);
      }
    } catch (error) {
      console.error("Error loading budget:", error);
    }

    setIsLoaded(true);
  }, []);

  // Save budget
  useEffect(() => {
    if (isLoaded) {
      saveData("spendwise-budget", budget);
    }
  }, [budget, isLoaded]);

  // Update budget
  function updateBudget(newAmount) {
    const numericAmount = Number(newAmount);

    if (Number.isFinite(numericAmount) && numericAmount >= 0) {
      setBudget(numericAmount);
    }
  }

  return (
    <BudgetContext.Provider value={{ budget, updateBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error("useBudget must be used inside a BudgetProvider");
  }

  return context;
}
