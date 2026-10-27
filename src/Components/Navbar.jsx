import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const committedQuery = searchParams.get("q") ?? "";
  const [draft, setDraft] = useState({
    search: location.search,
    value: committedQuery,
  });
  const searchValue =
    draft.search === location.search ? draft.value : committedQuery;

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchValue.trim();
    navigate(query ? `/?q=${encodeURIComponent(query)}#MonkeyBookTrans` : "/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Money & Monkey
      </Link>

      <form className="navbar-search" role="search" onSubmit={handleSearch}>
        <label className="visually-hidden" htmlFor="transaction-search">
          Search transactions
        </label>
        <input
          id="transaction-search"
          type="search"
          placeholder="Search transactions"
          value={searchValue}
          onChange={(event) =>
            setDraft({ search: location.search, value: event.target.value })
          }
        />
        <button type="submit">Search</button>
      </form>

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
