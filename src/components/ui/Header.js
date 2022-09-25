import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Bell, House, ThumbsUp, UserCircle } from "phosphor-react";
import { useAuth } from "@hooks/useAuth";
import useRatingsSnapshot from "@hooks/useRatingsSnapshot";
import { ICON_SIZE, ICON_SIZE_SM } from "@consts/consts";
import {
  getTodaysDateSimple,
  getTodaysDate,
  calculateTimeSince,
} from "@utils/utils";

const Header = () => {
  const { handleLogout, currentUser, clearError } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { ratings, ratingsLoading } = useRatingsSnapshot({
    imageData: {
      date: getTodaysDate(),
    },
  });
  const today = getTodaysDateSimple();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sticky top-0 z-50 flex justify-center mb-5">
      <div className="navbar bg-base-100 bg-opacity-75 backdrop-blur-sm sm:max-w-2xl">
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
                <Link href="/">
                  <a className="justify-between">
                    New Daily Gerth!
                    <span className="badge bg-primary text-black rounded-lg">
                      {today}
                    </span>
                  </a>
                </Link>
              </li>
              {ratings.map((userRating) => {
                return (
                  <li key={userRating.username}>
                    <a>
                      {userRating.username} rated today
                      <span className="badge bg-neutral rounded-lg">
                        {calculateTimeSince(userRating.timestamp)}
                      </span>
                    </a>
                  </li>
                );
              })}
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
                  {router.pathname !== "/" && (
                    <Link href="/">
                      <a className="justify-between">
                        Home
                        <span>
                          <House size={ICON_SIZE_SM} />
                        </span>
                      </a>
                    </Link>
                  )}
                  {router.pathname !== "/profile" && (
                    <Link href="/profile">
                      <a className="justify-between">
                        Profile
                        <span>
                          <UserCircle size={ICON_SIZE_SM} />
                        </span>
                      </a>
                    </Link>
                  )}
                  {router.pathname !== "/feedback" && (
                    <Link href="/feedback">
                      <a className="justify-between">
                        Feedback
                        <span>
                          <ThumbsUp size={ICON_SIZE_SM} />
                        </span>
                      </a>
                    </Link>
                  )}
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
                <li>
                  <a onClick={() => handleLogout()}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
