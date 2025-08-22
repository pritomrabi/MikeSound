import { useState, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";

const Search = ({ setSearch }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      // Fake API call
      setTimeout(() => {
        setResults([
          { id: 1, name: `Product matching "${query}" 1` },
          { id: 2, name: `Product matching "${query}" 2` },
          { id: 3, name: `Product matching "${query}" 3` },
        ]);
        setLoading(false);
        setActiveIndex(-1);
      }, 1000);
    }, 300);
  }, [query]);

  // Close on Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSearch(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setSearch]);

  // Close on outside click (not input area)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearch]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev === 0 ? results.length - 1 : prev - 1
      );
    }
    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      alert(`Selected: ${results[activeIndex].name}`);
    }
  };

  return (
    <div className="absolute w-full top-0 left-0 transition-all duration-500 h-screen">
      <div className="w-full h-full"></div>
      <div
        ref={containerRef}
        className="fixed right-0 bg-[#fdfeff] dark:bg-[#1a1a1a] w-full h-full items-center top-20 shadow-md z-50 overflow-y-auto"
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex border-y border-secandari py-6"
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search For Products ..."
            className="w-full px-4 py-2 rounded-lg outline-none transition-all text-xl font-Lato font-medium text-primary-default dark:text-primary-dark border-none justify-center flex text-center placeholder:text-3xl"
          />

          <button
            type="button"
            onClick={() => setSearch(false)}
            className="pr-14 cursor-pointer"
          >
            <RxCross2 size={30} />
          </button>
        </form>


        <div className="p-6">
          {loading && (
            <p className="text-center text-primary-default dark:text-primary-dark">
              Loading results...
            </p>
          )}
          {!loading && results.length === 0 && (
            <p className="text-center text-secandari text-sm font-Lato">
              Start typing to see products you are looking for.
            </p>
          )}
          {!loading && results.length > 0 && (
            <ul className="space-y-3">
              {results.map((item, index) => (
                <li
                  key={item.id}
                  className={`p-4 rounded-lg cursor-pointer ${index === activeIndex
                      ? "bg-gray-300 dark:bg-gray-600"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
