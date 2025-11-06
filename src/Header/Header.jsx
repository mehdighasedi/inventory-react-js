import { useState, useRef, useEffect } from "react";
import { CiSun } from "react-icons/ci";
import { useDarkmode } from "../Context/DarkModeContext";
import { HiComputerDesktop, HiMoon, HiSun } from "react-icons/hi2";
import { useProducts } from "../Context/ProductContext";

function Header() {
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkmode();
  const { products } = useProducts();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-slate-700 h-12 p-2 flex items-center mb-4 justify-center gap-x-4">
      <h1 className="text-xl font-bold text-slate-300">پروژه انباری داری - ریکت و تیلویند</h1>

      <span className="flex items-center font-bold justify-center bg-slate-500 text-slate-300 border-2 border-slate-400 w-7 h-7 rounded-full p-2">
        {products.length}
      </span>

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center text-secondary-400"
        >
          {isDarkMode ? <HiSun className="w-6 h-6" /> : <HiMoon className="w-6 h-6" />}
        </button>

        {open && <ThemeChange />}
      </div>
    </header>
  );
}

function ThemeChange() {
  const { isDarkMode, toggleDarkMode } = useDarkmode();

  const setSystemMode = () => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (systemPrefersDark && !isDarkMode) toggleDarkMode();
    if (!systemPrefersDark && isDarkMode) toggleDarkMode();
  };

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-700 text-white px-4 py-3 rounded-lg shadow-lg border border-slate-600 w-40 text-center">
      <ul className="mt-2 space-y-1">
        <li
          onClick={() => {
            if (!isDarkMode) toggleDarkMode();
          }}
          className={`hover:bg-slate-600 rounded-md cursor-pointer py-1 flex items-center justify-center gap-x-2 ${
            isDarkMode ? "bg-slate-600" : ""
          }`}
        >
          <HiSun />
          روشن
        </li>
        <li
          onClick={() => {
            if (isDarkMode) toggleDarkMode();
          }}
          className={`hover:bg-slate-600 rounded-md cursor-pointer py-1 flex items-center justify-center gap-x-2 ${
            !isDarkMode ? "bg-slate-600" : ""
          }`}
        >
          <HiMoon />
          تاریک
        </li>
        <li
          className="hover:bg-slate-600 rounded-md cursor-pointer py-1 flex items-center justify-center gap-x-2"
          onClick={setSystemMode}
        >
          <HiComputerDesktop />
          سیستم
        </li>
      </ul>
    </div>
  );
}

export default Header;
