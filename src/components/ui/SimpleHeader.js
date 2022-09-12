import Link from "next/link";
import { useTheme } from "next-themes";
import { SlidersHorizontal } from "phosphor-react";
import { ICON_SIZE } from "@consts/consts";

const SimpleHeader = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 bg-opacity-75 backdrop-blur-sm mb-5">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl rounded-lg">
            The Daily Gerth
          </a>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="flex justify-center w-10 rounded-full">
              <SlidersHorizontal size={ICON_SIZE} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu rounded-lg dropdown-content mt-3 mx-1 shadow bg-base-100 rounded-box w-40 bg-opacity-75 backdrop-blur-sm"
          >
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
    </div>
  );
};

export default SimpleHeader;
