import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAuth } from "@hooks/useAuth";
import { Bell, UserCircle } from "phosphor-react";
import { ICON_SIZE } from "@consts/consts";
import { getTodaysDateSimple } from "@utils/utils";

const Header = () => {
  const { handleLogout, currentUser, clearError } = useAuth();
  const [checked, setChecked] = useState(false);
  const { theme, setTheme } = useTheme();
  const today = getTodaysDateSimple();

  const handleToggleTheme = () => {
    setChecked(!checked);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 bg-opacity-75 backdrop-blur-sm mb-5">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Bell size={ICON_SIZE} />
              <span className="badge badge-xs badge-primary indicator-item rounded-full"></span>
            </div>
          </label>
          <ul
            tabIndex="0"
            className="menu rounded-lg dropdown-content mt-3 mx-1 shadow bg-base-100 rounded-box w-64 bg-opacity-75 backdrop-blur-sm"
          >
            <li>
              <a className="justify-between">
                New Daily Gerth!
                <span className="badge bg-primary rounded-lg">{today}</span>
              </a>
            </li>
            <li>
              <a>MattyP rated today</a>
            </li>
            <li>
              <a>WifeyP rated today</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl rounded-lg">
            The Daily Gerth
          </a>
        </Link>
      </div>
      {currentUser && (
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <UserCircle size={40} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu rounded-lg dropdown-content mt-3 mx-1 shadow bg-base-100 rounded-box w-40 bg-opacity-75 backdrop-blur-sm"
            >
              <li>
                <Link href="/profile">
                  <a className="justify-between">
                    Profile
                    {/* <span className="badge">New Favorites!</span> */}
                  </a>
                </Link>
              </li>
              <li>
                <a onClick={() => handleLogout()}>Logout</a>
              </li>
              <li>
                <a className="justify-between">
                  Theme
                  <div className="form-control m-0 p-0">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary rounded-full"
                      checked={theme === "light"}
                      onChange={handleToggleTheme}
                    />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
