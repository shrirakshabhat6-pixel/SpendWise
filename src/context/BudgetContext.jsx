"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { saveData, getData } from "../utils/Storage";

const BudgetContext = createContext(null);

export function BudgetProvider({ children }) {
  const [budget, setBudget] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedBudget = getData("budget", 0);
      const parsedBudget = Number(savedBudget);
      setBudget(!isNaN(parsedBudget) && parsedBudget >= 0 ? parsedBudget : 0);
    } catch (error) {
      console.error("Failed to restore budget state from storage:", error);
      setBudget(0);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save updated budget whenever state changes post-initialization
  useEffect(() => {
    if (isLoaded) {
      saveData("budget", budget);
    }
  }, [budget, isLoaded]);

  function updateBudget(newBudget) {
    const numericValue = Number(newBudget);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setBudget(numericValue);
    } else {
      console.warn("Attempted to set invalid budget value:", newBudget);
    }
  }

  function resetBudget() {
    setBudget(0);
  }

  return (
    <BudgetContext.Provider value={{ budget, updateBudget, resetBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error("useBudget must be consumed within a BudgetProvider wrapper");
  }

  return context;
}