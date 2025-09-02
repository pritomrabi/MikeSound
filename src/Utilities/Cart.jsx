import { useState, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Cart = ({ setIsOpen }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef(null);

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
      }, 800);
    }, 300);
  }, [query]);

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
    <div className="absolute w-full top-0 left-0 flex transition-all duration-500 h-screen">
      <div
        onClick={() => setIsOpen(true)}
        className="lg:w-[55%] xl:w-[65%] md:w-[35%] sm:w-[40%] w-[5%] h-full cursor-pointer fixed top-0 left-0 z-40"
      ></div>

      <div className="fixed right-0  bg-[#fdfeff] dark:bg-[#1a1a1a] xl:w-[35%] lg:w-[45%] md:w-[65%] sm:w-[60%] w-[85%] h-[98%] items-center top-1 bottom-2  shadow-md rounded-l-2xl px-1 sm:px-4 md:px-8 py-4 z-50">
        <p
          onClick={() => setIsOpen(true)}
          className=" absolute -left-5 border-[4px] text-white bg-brand duration-100 p-2 w-fit rounded-full drop-shadow-sm cursor-pointer"
        >
          <RxCross2 className=" text-lg" />
        </p>

        <div className="p-6">
          {/* Search Box */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border border-secandari rounded-2xl py-4 pl-4 pr-10 text-sm text-gray-700 dark:text-gray-50 placeholder-gray-500 outline-none font-Lato font-normal"
            />
            <button
              type="submit"
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand"
            >
              <FiSearch size={20} />
            </button>
          </div>

          {/* Search Results */}
          <div className="mt-4">
            {loading && (
              <p className="text-center text-primary-default dark:text-primary-dark">
                Loading results...
              </p>
            )}
            {!loading && results.length === 0 && query.trim() !== "" && (
              <p className="text-center text-secandari text-sm font-Lato">
                No products found.
              </p>
            )}
            {!loading && results.length > 0 && (
              <ul className="space-y-2">
                {results.map((item, index) => (
                  <li
                    key={item.id}
                    className={`p-3 rounded-lg cursor-pointer ${index === activeIndex
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

          {/* Sidebar Links */}
          <ul className="flex flex-col items-start space-y-4 mt-8 text-primary-default dark:text-primary-dark font-Lato font-medium text-lg">
            <Link
              to="/"
              onClick={() => setIsOpen(true)}
              className="hover:text-brand duration-100"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsOpen(true)}
              className="hover:text-brand duration-100"
            >
              Shop
            </Link>
            <Link
              to="/support"
              onClick={() => setIsOpen(true)}
              className="hover:text-brand duration-100"
            >
              Support
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
