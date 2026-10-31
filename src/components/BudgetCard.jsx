
function BudgetCard({ title, amount }) {
  return (
    <div className="budget-card">
      <h3>{title}</h3>
      <h2>₹{amount}</h2>
    </div>
  );
}
export default BudgetCard;