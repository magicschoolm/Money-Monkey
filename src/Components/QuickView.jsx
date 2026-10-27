import React from "react";

const QuickView = () => {
  return (
    <div className="quickview">
      <h1 className="quickview-title">Quick View</h1>

      <div className="quickview-cards">
        <section className="income">
          <span className="card-label">Total Income</span>
          <h2>₹25,000</h2>
          <p>↗ Money received</p>
        </section>

        <section className="expences">
          <span className="card-label">Total Expenses</span>
          <h2>₹12,500</h2>
          <p>↘ Money spent</p>
        </section>
      </div>
    </div>
  );
};

export default QuickView;