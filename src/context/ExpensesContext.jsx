
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

  useEffect(() => {
    try {
      const savedExpenses = localStorage.getItem("spendwise-expenses");

      if (savedExpenses !== null) {
        setExpenses(JSON.parse(savedExpenses));
      }
    } catch (error) {
      console.error("Unable to load expenses:", error);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "spendwise-expenses",
        JSON.stringify(expenses)
      );
    }
  }, [expenses, isLoaded]);

  const addExpense = (expense) => {
    setExpenses((previous) => [
      { ...expense, id: Date.now() },
      ...previous,
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((previous) =>
      previous.filter((expense) => expense.id !== id)
    );
  };

  const updateExpense = (updatedExpense) => {
    setExpenses((previous) =>
      previous.map((expense) =>
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
