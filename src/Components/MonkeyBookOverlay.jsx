
import { useEffect, useState } from "react";
import AddTransaction from "../Components/AddNewTrans";

function MonkeyBookTrans() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("edit");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const normalizedSearch = searchValue.trim().toLocaleLowerCase();
  const filteredTransactions = transactions.filter((item) =>
    [
      item.date,
      item.description,
      item.amount,
      item.type,
      item.remarks,
    ].some((value) =>
      String(value ?? "").toLocaleLowerCase().includes(normalizedSearch)
    )
  );


const getTransactions = async () => {
  try {
    const response = await fetch("http://localhost:8000/tracks");

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
};

useEffect(() => {
  getTransactions();
}, []);

 
  // EDIT BUTTON
  const handleEdit = (item) => {
    setFormMode("edit");
    setSelectedTransaction(item);
    setShowForm(true);
  };

  // DELETE BUTTON
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/tracks/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      setTransactions((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section id="MonkeyBookTrans">
    <div className="monkey-book-panel">
      <div className="transaction-list-toolbar">
        <h1 className="monkey-book-title">
          Monkey Transactions
        </h1>
        <form
          className="transaction-search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="visually-hidden" htmlFor="transaction-search">
            Search transactions
          </label>
          <input
            id="transaction-search"
            type="search"
            placeholder="Search by date, description, amount..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          {searchValue && (
            <button
              className="transaction-search-clear"
              type="button"
              onClick={() => setSearchValue("")}
            >
              Clear
            </button>
          )}
        </form>
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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.description}</td>

                <td className="amount">
                  ₹{Number(item.amount).toFixed(2)}
                </td>

                <td>
                  <span
                    className={`type-badge ${
                      String(item.type).toLowerCase() === "income"
                        ? "type-badge--income"
                        : "type-badge--expense"
                    }`}
                  >
                    {item.type}
                  </span>
                </td>

                <td className="transaction-remarks">
                  {item.remarks}
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit Transaction
                  </button>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete Transaction
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <p className="transaction-empty">
          No transactions found.
        </p>
      )}
      {transactions.length > 0 && filteredTransactions.length === 0 && (
        <p className="transaction-empty">
          No transactions match “{searchValue.trim()}”. Try another search.
        </p>
      )}

      {showForm && (
  <AddTransaction
    mode={formMode}
    transaction={selectedTransaction}
    onClose={() => setShowForm(false)}
    onSuccess={getTransactions}
  />
)}
    </div>
    </section>
  );
}

export default MonkeyBookTrans;
