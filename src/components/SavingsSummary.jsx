"use client";

import { useSavings } from "../context/SavingsContext";

export default function SavingsSummary() {
  const { goals, monthlyTarget, updateMonthlyTarget } = useSavings();

  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthlySaved = goals.reduce((total, goal) => {
    const goalMonthlyTotal = (goal.contributions || [])
      .filter((item) => item.date.slice(0, 7) === currentMonth)
      .reduce((sum, item) => sum + Number(item.amount), 0);

    return total + goalMonthlyTotal;
  }, 0);

  const percentage =
    monthlyTarget > 0
      ? Math.min((monthlySaved / monthlyTarget) * 100, 100)
      : 0;

  const remaining = Math.max(monthlyTarget - monthlySaved, 0);

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <section className="savings-summary">
      <div className="savings-summary-top">
        <div>
          <p className="savings-eyebrow">YOUR MONTHLY SAVINGS</p>
          <h2>{formatMoney(monthlySaved)}</h2>
          <p className="savings-muted">Total contributed this month</p>
        </div>

        <div className="savings-summary-icon">💰</div>
      </div>

      <div className="savings-target-row">
        <label htmlFor="monthly-target">Monthly savings target</label>

        <div className="savings-target-input">
          <span>₹</span>
          <input
            id="monthly-target"
            type="number"
            min="0"
            value={monthlyTarget}
            onChange={(event) =>
              updateMonthlyTarget(event.target.value)
            }
          />
        </div>
      </div>

      <div className="savings-progress-track">
        <div
          className="savings-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="savings-summary-bottom">
        <span>{percentage.toFixed(0)}% completed</span>
        <span>{formatMoney(remaining)} remaining</span>
      </div>

      {monthlyTarget > 0 && monthlySaved >= monthlyTarget && (
        <p className="savings-success">
          🎉 Amazing! You reached your monthly savings target!
        </p>
      )}
    </section>
  );
}