import { useAuth } from "../../hooks/useAuth";
import Link from "next/link";

const Header = () => {
  const { handleLogout, currentUser, clearError } = useAuth();

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 shadow-xl rounded-box w-52"
          >
            {currentUser ? (
              <>
                <li>
                  <a onClick={() => handleLogout()}>logout</a>
                </li>
                <li>
                  <Link href="/favorites">
                    <a onClick={() => clearError()}>Favorites</a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    <a onClick={() => clearError()}>login</a>
                  </Link>
                </li>
                <li>
                  <Link href="/activate">
                    <a onClick={() => clearError()}>activate</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">The Daily Gerth</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {currentUser ? (
            <>
              <li>
                <a onClick={() => handleLogout()}>logout</a>
              </li>

              <li>
                <Link href="/favorites">
                  <a onClick={() => clearError()}>Favorites</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  <a onClick={() => clearError()}>login</a>
                </Link>
              </li>
              <li>
                <Link href="/activate">
                  <a onClick={() => clearError()}>activate</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* <div className="navbar-end">
        <a className="btn">Get started</a>
      </div> */}
    </div>
  );
};

export default Header;
