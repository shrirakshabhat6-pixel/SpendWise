
"use client";

import ExpenseForm from "@/components/ExpenseForm";
import ExpensesList from "@/components/ExpensesList";
import Navbar from "@/components/Navbar";

export default function ExpensesPage() {
  return (
    <>
      <Navbar />

      <main>
        <h1>Manage Expenses</h1>
        <ExpenseForm />
        <ExpensesList />
      </main>
    </>
  );
}
