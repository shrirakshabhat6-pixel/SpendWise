"use client";

import { ExpensesProvider } from "../context/ExpensesContext";
import { BudgetProvider } from "../context/BudgetContext";
import { SavingsProvider } from "../context/SavingsContext";

export function Providers({ children }) {
  return (
    <ExpensesProvider>
      <BudgetProvider>
        <SavingsProvider>
          {children}
        </SavingsProvider>
      </BudgetProvider>
    </ExpensesProvider>
  );
}