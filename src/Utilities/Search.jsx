import { useState, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";

const Search = ({ setSearch }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  // Fetch products with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://mikesound-backend.onrender.com/api/products/?q=${query}`
        );
        const data = await res.json();
        setResults(data.products || []);
        setActiveIndex(-1);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
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

  // Close on outside click
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
      navigate(`/singleproduct/${results[activeIndex].id}`);
      setSearch(false);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/singleproduct/${id}`);
    setSearch(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/30 z-50 flex justify-center items-start py-20">
      <div
        ref={containerRef}
        className="bg-brand  w-[90%] h-full p-6 rounded shadow-lg overflow-y-auto"
      >
        <div className="flex mb-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for products..."
            className="flex-1 p-3 text-lg rounded-lg border border-white outline-none"
          />
          <button
            type="button"
            onClick={() => setSearch(false)}
            className="ml-2 p-2 cursor-pointer"
          >
            <RxCross2 size={24} />
          </button>
        </div>
        {loading && <p className="text-center">Loading results...</p>}
        {!loading && results.length === 0 && query && (
          <p className="text-center text-gray-500">No products found</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer"
            >
              <ProductCard
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.variations[0]?.final_price || 0,
                  oldPrice: product.discount > 0 ? product.variations[0]?.price : null,
                  img: product.images[0]?.image,
                  rating: product.rating || 4,
                  sold: product.sold_count || 0
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
