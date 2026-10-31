
function SpendingChart({ categoryExpenses }) {
  const amounts = Object.values(categoryExpenses);
  const maxAmount = Math.max(...amounts, 1);

  return (
    <div className="spending-chart">
      <h2>Category-wise Spending</h2>

      {Object.entries(categoryExpenses).map(([category, amount]) => (
        <div className="chart-item" key={category}>
          <div className="chart-info">
            <span>{category}</span>
            <span>₹{amount}</span>
          </div>

          <div className="chart-bar">
            <div
              className="chart-fill"
              style={{ width: `${(amount / maxAmount) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpendingChart;