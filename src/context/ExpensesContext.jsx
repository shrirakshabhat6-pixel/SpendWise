
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import initialExpenses from "@/data/expenses";

const ExpensesContext = createContext();

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load expenses from LocalStorage
  useEffect(() => {
    try {
      const savedExpenses = localStorage.getItem("spendwise-expenses");

      if (savedExpenses !== null) {
        const parsedExpenses = JSON.parse(savedExpenses);

        if (Array.isArray(parsedExpenses)) {
          setExpenses(parsedExpenses);
        }
      } else {
        // Support expenses saved by the other branch
        const previousExpenses = localStorage.getItem("expenses");

        if (previousExpenses !== null) {
          const parsedExpenses = JSON.parse(previousExpenses);

          if (Array.isArray(parsedExpenses)) {
            setExpenses(parsedExpenses);
          }
        }
      }
    } catch (error) {
      console.error("Unable to load expenses:", error);
    }

    setIsLoaded(true);
  }, []);

  // Save expenses to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "spendwise-expenses",
        JSON.stringify(expenses)
      );
    }
  }, [expenses, isLoaded]);

  // Add expense
  const addExpense = (expense) => {
    setExpenses((previousExpenses) => [
      {
        ...expense,
        id: expense.id ?? Date.now(),
      },
      ...previousExpenses,
    ]);
  };

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== id)
    );
  };

  // Update expense
  const updateExpense = (updatedExpense) => {
    setExpenses((previousExpenses) =>
      previousExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpensesContext);
}
