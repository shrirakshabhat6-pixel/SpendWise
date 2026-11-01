"use client";

import { ExpensesProvider } from "../context/ExpensesContext";

export default function Providers({ children }) {
  return (
    <ExpensesProvider>
      {children}
    </ExpensesProvider>
  );
}