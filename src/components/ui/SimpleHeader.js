import Link from "next/link";
import { useTheme } from "next-themes";

const SimpleHeader = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex justify-center">
      <div className="navbar sm:max-w-xl">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <Link href="/">
            <a className="btn btn-ghost normal-case text-xl rounded-lg">
              The Daily Gerth
            </a>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="form-control p-2">
            <input
              type="checkbox"
              className="toggle toggle-primary rounded-full"
              checked={theme === "light"}
              onChange={handleToggleTheme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
