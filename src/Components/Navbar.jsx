import { useState } from "react";
import { Link } from "react-router-dom";
import AddTransaction from "../Components/AddNewTrans"
function Navbar() {
  const [showEdit, setShowEdit] = useState(false);
 

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Money & Monkey
      </Link>

      <button
        className="nav-add-button"
        type="button"
        onClick={() => setShowEdit(true)}
      >
        + Add Transaction
      </button>

      {showEdit && (
        <AddTransaction
          mode="add"
          onClose={() => setShowEdit(false)}
        />
      )}

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/workspace">WorkSpace</Link>
        </li>
        <li>
          <Link to="/contact">sign-in</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
