import { useState, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import ProductCard from "../Components/ProductCard";

const Cart = ({ setIsOpen }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [openCategory, setOpenCategory] = useState(null);
  const debounceRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://dj-completed-project.onrender.com/api/products/?q=${query}`);
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
      handleProductClick(results[activeIndex].id);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/singleproduct/${id}`);
    setIsOpen(false);
  };

  const toggleCategory = (cat) => {
    setOpenCategory(openCategory === cat ? null : cat);
  };

  return (
    <div className="absolute w-full top-0 left-0 flex transition-all duration-500 h-screen">
      <div
        onClick={() => setIsOpen(true)}
        className="lg:w-[55%] xl:w-[65%] md:w-[35%] sm:w-[40%] w-[5%] h-full cursor-pointer fixed top-0 left-0 z-50"
      ></div>

      <div className="fixed left-0 bg-[#fdfeff] dark:bg-[#1a1a1a] xl:w-[35%] lg:w-[45%] md:w-[65%] sm:w-[60%] w-[85%] h-[98%] items-center top-1 bottom-2 shadow-md rounded-l-2xl px-1 sm:px-4 md:px-8 py-4 z-50">
        <p
          onClick={() => setIsOpen(true)}
          className="absolute -right-5 border-[4px] text-white bg-brand duration-100 p-2 w-fit rounded-full drop-shadow-sm cursor-pointer"
        >
          <RxCross2 className="text-lg" />
        </p>

        <div className="p-6">
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

          {loading && <p className="text-center text-primary-default dark:text-primary-dark">Loading results...</p>}
          {!loading && results.length === 0 && query.trim() !== "" && (
            <p className="text-center text-secandari text-sm font-Lato">No products found.</p>
          )}

          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
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
          )}

          <ul className="flex flex-col items-start space-y-4 mt-8 text-primary-default dark:text-primary-dark font-Lato font-medium text-lg">
            <Link to="/headphone" onClick={() => setIsOpen(true)} className="hover:text-brand duration-100">Headphone</Link>
            <Link to="/Speakers" onClick={() => setIsOpen(true)} className="hover:text-brand duration-100">Speakers</Link>
            <Link to="/Earbud" onClick={() => setIsOpen(true)} className="hover:text-brand duration-100">Earbud</Link>
            <Link to="/gaming" onClick={() => setIsOpen(true)} className="hover:text-brand duration-100">Gaming</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
