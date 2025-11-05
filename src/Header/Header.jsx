import { useState, useRef, useEffect } from "react";
import { CiSun } from "react-icons/ci";

function Header() {
  const [open, setOpen] = useState(false);
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
        7
      </span>

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center text-secondary-400"
        >
          <CiSun className="w-6 h-6" />
        </button>

        {open && <ThemeChange />}
      </div>
    </header>
  );
}

function ThemeChange() {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-700 text-white px-4 py-3 rounded-lg shadow-lg border border-slate-600 w-40 text-center">
      <ul className="mt-2 space-y-1">
        <li className="hover:bg-slate-600 rounded-md cursor-pointer py-1">🌞 روشن</li>
        <li className="hover:bg-slate-600 rounded-md cursor-pointer py-1">🌚 تاریک</li>
        <li className="hover:bg-slate-600 rounded-md cursor-pointer py-1">💻 سیستم</li>
      </ul>
    </div>
  );
}

export default Header;
