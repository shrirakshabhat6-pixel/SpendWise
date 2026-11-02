"use client";

import { ExpensesProvider } from "../context/ExpensesContext";
import { BudgetProvider } from "../context/BudgetContext";

export function Providers({ children }) {
  return (
    <ExpensesProvider>
      <BudgetProvider>{children}</BudgetProvider>
    </ExpensesProvider>
  );
}
