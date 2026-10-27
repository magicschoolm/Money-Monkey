import { useState } from "react";

function CompanyDepartmentTrans() {
  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    type: "",
    date: "",
  });

  function handleChange(e) {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("New Transaction:", transaction);
    alert("Transaction added successfully!");

    setTransaction({
      title: "",
      amount: "",
      type: "",
      date: "",
    });
  }

  return (
    <div className="transaction-form">
      <h2>Project Transaction</h2>

      <form onSubmit={handleSubmit}>
        <div className="Transaction-name" >
        <select
          name="type"
          onChange={handleChange}
        >
          <option value="expense">KALAI</option>
          <option value="income">HC</option>
          <option value="income">RATHINAM</option>
          <option value="income">NEHRU</option>
          <option value="income">ADF</option>
        </select>
        </div>

        <select
          name="type"
          value={transaction.type}
          onChange={handleChange}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          name="amount"
          type="number"
          placeholder="Amount (₹)"
          value={transaction.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          required
        />

        

        <input
          name="date"
          type="date"
          value={transaction.date}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default CompanyDepartmentTrans;