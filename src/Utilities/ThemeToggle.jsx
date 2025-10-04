import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi"; // Import icons

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("dark") === "theme"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className=" text-white text-xl  hover:opacity-90 flex items-center justify-center cursor-pointer"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <FiSun className="sm:text-2xl text-xl" /> : <FiMoon className="sm:text-2xl text-xl text-brand" />}
    </button>
  );
};

export default ThemeToggle;
