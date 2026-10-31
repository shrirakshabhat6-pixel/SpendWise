export function calculateTotalExpenses(expenses) {
  return expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
}

export function calculateRemainingBudget(budget, expenses) {
  return budget - calculateTotalExpenses(expenses);
}

export function calculateCategoryExpenses(expenses) {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category;

    categoryTotals[category] =
      (categoryTotals[category] || 0) + expense.amount;
  });

  return categoryTotals;
}
