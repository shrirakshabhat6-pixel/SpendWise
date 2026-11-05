
"use client";

export default function SavingsGoalCard({
  goal,
  onAdd,
  onDelete,
}) {
  const savedAmount = (goal.contributions || []).reduce(
    (total, item) => total + Number(item.amount),
    0
  );

  const target = Number(goal.targetAmount) || 0;

  const percentage =
    target > 0
      ? Math.min((savedAmount / target) * 100, 100)
      : 0;

  const remaining = Math.max(target - savedAmount, 0);

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const categoryEmoji = {
    Vacation: "✈️",
    Phone: "📱",
    Laptop: "💻",
    "College Fees": "🎓",
    "Emergency Fund": "🛡️",
    Vehicle: "🚗",
    Home: "🏠",
    Other: "🎯",
  };

  const completed = percentage >= 100;

  return (
    <article className="savings-goal-card">
      <div className="savings-goal-heading">
        <div className="savings-goal-icon">
          {categoryEmoji[goal.category] || "🎯"}
        </div>

        <div className="savings-goal-title">
          <h3>{goal.name}</h3>
          <p>{goal.category}</p>
        </div>

        <button
          type="button"
          className="savings-delete-button"
          onClick={() => {
            if (window.confirm("Delete this savings goal?")) {
              onDelete(goal.id);
            }
          }}
          aria-label={`Delete ${goal.name}`}
          title="Delete goal"
        >
          🗑️
        </button>
      </div>

      <div className="savings-goal-amounts">
        <div>
          <p>Saved so far</p>
          <strong>{formatMoney(savedAmount)}</strong>
        </div>

        <div className="savings-goal-percentage">
          <strong>{percentage.toFixed(0)}%</strong>
        </div>
      </div>

      <div className="savings-progress-track">
        <div
          className={`savings-progress-fill ${
            completed ? "completed" : ""
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="savings-goal-footer">
        <span>Target: {formatMoney(target)}</span>
        <span>Remaining: {formatMoney(remaining)}</span>
      </div>

      {goal.targetDate && (
        <p className="savings-goal-date">
          Target date: {goal.targetDate}
        </p>
      )}

      {completed ? (
        <div className="savings-completed">
          🎉 Goal completed! Congratulations!
        </div>
      ) : (
        <button
          type="button"
          className="savings-add-button"
          onClick={() => onAdd(goal)}
        >
          + Add Savings
        </button>
      )}
    </article>
  );
}
