"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { saveData, getData } from "../utils/Storage";

const BudgetContext = createContext(null);

export function BudgetProvider({ children }) {
  const [budget, setBudget] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved budget from localStorage
  useEffect(() => {
    try {
      const savedBudget = getData("budget", 0);
      setBudget(Number(savedBudget) || 0);
    } catch (error) {
      console.error("Error loading budget:", error);
      setBudget(0);
    }

    setIsLoaded(true);
  }, []);

  // Save budget to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveData("budget", budget);
    }
  }, [budget, isLoaded]);

  // Update budget function
  function updateBudget(newAmount) {
    const numericAmount = Number(newAmount);
    if (!isNaN(numericAmount) && numericAmount >= 0) {
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
