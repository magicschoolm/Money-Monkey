
import { useEffect, useState } from "react";

function MonkeyBookTrans() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTransactions() {
      try {
        const response = await fetch(
          "http://localhost:8000/tracks"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getTransactions();
  }, []);

  if (loading) return <p>Loading transactions...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="monkey-book-panel">
      <div className="-heademonkey-bookr">
        <h1 className="monkey-book-title">Monkey Transactions</h1>
      </div>

      <div className="transaction-table-wrap">
        <table className="balance-box">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.description}</td>
                <td className="amount">
                  ₹{Number(item.amount).toFixed(2)}
                </td>
                <td>
                  <span
                    className={`type-badge ${String(item.type).toLowerCase() === "income" ? "income" : "expense"}`}
                  >
                    {item.type}
                  </span>
                </td>
                <td className="transaction-remarks">{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <p className="transaction-empty">No transactions found.</p>
      )}
    </div>
  );
}

export default MonkeyBookTrans;
