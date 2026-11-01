"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { saveData, getData } from "../utils/Storage";

const ExpensesContext = createContext();

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load expenses from LocalStorage
  useEffect(() => {
    const savedExpenses = getData("expenses", []);

    setExpenses(savedExpenses);
    setIsLoaded(true);
  }, []);

  // Save expenses to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      saveData("expenses", expenses);
    }
  }, [expenses, isLoaded]);

  // Add expense
  function addExpense(expense) {
    setExpenses((previousExpenses) => [
      ...previousExpenses,
      expense,
    ]);
  }

  // Delete expense
  function deleteExpense(id) {
    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== id)
    );
  }

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, deleteExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpensesContext);
}