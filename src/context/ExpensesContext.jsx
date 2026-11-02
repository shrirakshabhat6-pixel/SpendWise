"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { saveData, getData } from "../utils/Storage";

const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedExpenses = getData("expenses", []);
      setExpenses(Array.isArray(savedExpenses) ? savedExpenses : []);
    } catch (error) {
      console.error("Error loading expenses from storage:", error);
      setExpenses([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveData("expenses", expenses);
    }
  }, [expenses, isLoaded]);

  function addExpense(expense) {
    if (!expense || typeof expense !== "object") return;
    setExpenses((prev) => [expense, ...prev]);
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }

  return context;
}