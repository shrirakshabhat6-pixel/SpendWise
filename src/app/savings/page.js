
"use client";

import { useState } from "react";
import { useSavings } from "../../context/SavingsContext";
import SavingsSummary from "../../components/SavingsSummary";
import SavingsGoalCard from "../../components/SavingsGoalCard";
import SavingsGoalForm from "../../components/SavingsGoalForm";
import AddSavingsModal from "../../components/AddSavingsModal";

export default function SavingsPage() {
  const {
    goals,
    addGoal,
    deleteGoal,
    addContribution,
  } = useSavings();

  const [showForm, setShowForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  return (
    <main className="savings-page">
      <div className="savings-page-header">
        <div>
          <p className="savings-eyebrow">PLAN • SAVE • ACHIEVE</p>
          <h1>My Savings</h1>
          <p className="savings-muted">
            Small savings today, bigger dreams tomorrow.
          </p>
        </div>

        <button
          type="button"
          className="savings-add-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Create Goal"}
        </button>
      </div>

      <SavingsSummary />

      {showForm && (
        <SavingsGoalForm
          onAdd={(goal) => {
            addGoal(goal);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="savings-section-heading">
        <div>
          <h2>Your Savings Goals</h2>
          <p className="savings-muted">
            Track your progress towards each goal.
          </p>
        </div>

        <span className="savings-goal-count">
          {goals.length} {goals.length === 1 ? "Goal" : "Goals"}
        </span>
      </div>

      {goals.length === 0 ? (
        <div className="savings-empty">
          <div className="savings-empty-icon">🎯</div>
          <h3>No savings goals yet</h3>
          <p>
            Start with something you want to buy, achieve or save for.
          </p>
          <button
            type="button"
            className="savings-add-button"
            onClick={() => setShowForm(true)}
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="savings-goals-grid">
          {goals.map((goal) => (
            <SavingsGoalCard
              key={goal.id}
              goal={goal}
              onAdd={setSelectedGoal}
              onDelete={deleteGoal}
            />
          ))}
        </div>
      )}

      <AddSavingsModal
        goal={selectedGoal}
        onSave={addContribution}
        onClose={() => setSelectedGoal(null)}
      />
    </main>
  );
}
