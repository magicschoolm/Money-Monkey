
import { useEffect, useState } from "react";

function AddTransaction({ mode, transaction, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    amount: "",
    type: "",
    remarks: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load selected transaction when editing.
  // Reset the form when adding.
  useEffect(() => {
    if (mode === "edit" && transaction) {
      setFormData({
        date: transaction.date ?? "",
        description: transaction.description ?? "",
        amount: transaction.amount ?? "",
        type: transaction.type ?? "",
        remarks: transaction.remarks ?? "",
      });
    } else {
      setFormData({
        date: "",
        description: "",
        amount: "",
        type: "",
        remarks: "",
      });
    }

    setError("");
  }, [mode, transaction]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const isEditing = mode === "edit";

      if (isEditing && !transaction?.id) {
        throw new Error("Transaction ID is missing.");
      }

      const url = isEditing
        ? `http://localhost:8000/tracks/${transaction.id}`
        : "http://localhost:8000/tracks";

      const response = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
        }),
      });

      if (!response.ok) {
        throw new Error(
          isEditing
            ? "Failed to update transaction."
            : "Failed to add transaction."
        );
      }

      // Tell parent component to refresh the table.
      if (onSuccess) {
        await onSuccess();
      }

      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="transaction-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="transaction-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-modal-title"
      >
        <div className="transaction-modal-heading">
          <div>
            <p className="transaction-modal-eyebrow">
              {mode === "edit" ? "UPDATE YOUR RECORD" : "KEEP TRACK"}
            </p>
            <h2 id="transaction-modal-title">
              {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
            </h2>
          </div>
          <button
            className="transaction-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close transaction form"
            disabled={saving}
          >
            ×
          </button>
        </div>

        <form className="transaction-form" onSubmit={handleSubmit}>
          <label className="transaction-field">
            <span>Date</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>

          <label className="transaction-field">
            <span>Description</span>
            <input
              type="text"
              name="description"
              placeholder="What was this transaction for?"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>

          <label className="transaction-field">
            <span>Amount</span>
            <div className="transaction-amount-input">
              <span aria-hidden="true">₹</span>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                min="0"
                step="1"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className="transaction-field">
            <span>Type</span>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </label>

          <label className="transaction-field transaction-field-wide">
            <span>Remarks <small>(optional)</small></span>
            <input
              type="text"
              name="remarks"
              placeholder="Add a note"
              value={formData.remarks}
              onChange={handleChange}
            />
          </label>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          <div className="transaction-form-actions">
            <button
              className="transaction-cancel-button"
              type="button"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              className="transaction-submit-button"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : mode === "edit"
                  ? "Save Changes"
                  : "Add Transaction"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddTransaction;
