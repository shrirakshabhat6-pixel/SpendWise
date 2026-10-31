
import expenses from "../data/expenses";
import {
  calculateTotalExpenses,
  calculateRemainingBudget,
  calculateCategoryExpenses,
} from "./budgetCalculations";

const budget = 10000;

console.log("Total Expenses:", calculateTotalExpenses(expenses));

console.log(
  "Remaining Budget:",
  calculateRemainingBudget(budget, expenses)
);

console.log(
  "Category Wise Expenses:",
  calculateCategoryExpenses(expenses)
);