import { useState, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiSearch, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

const Cart = ({ setIsOpen }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [openCategory, setOpenCategory] = useState(null);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    {
      name: "Headphone",
      path: "/headphone",
      sub: [
        { name: "Wired", path: "/headphone/wired" },
        { name: "Wireless", path: "/headphone/wireless" },
        { name: "Over-Ear", path: "/headphone/over-ear" },
      ],
    },
    {
      name: "Speakers",
      path: "/speakers",
      sub: [
        { name: "Bluetooth", path: "/speakers/bluetooth" },
        { name: "Portable", path: "/speakers/portable" },
      ],
    },
    {
      name: "Earbud",
      path: "/earbud",
      sub: [
        { name: "ANC", path: "/earbud/anc" },
        { name: "Sports", path: "/earbud/sports" },
      ],
    },
    {
      name: "Gaming",
      path: "/gaming",
      sub: [
        { name: "Controllers", path: "/gaming/controllers" },
        { name: "Keyboards", path: "/gaming/keyboards" },
      ],
    },
  ];

  useEffect(() => {
    if (!query.trim()) return setResults([]);
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://mikesound-backend.onrender.com/api/products/?q=${query}`);
        const data = await res.json();
        setResults(data.products || []);
        setActiveIndex(-1);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [query]);

  const handleProductClick = (id) => {
    navigate(`/singleproduct/${id}`);
    setIsOpen(false);
  };

  const toggleCategory = (name) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  return (
    <div className="absolute text-black w-full top-0 left-0 flex transition-all duration-500 h-screen z-50">
      <div onClick={() => setIsOpen(true)} className="lg:w-[55%] xl:w-[65%] md:w-[35%] sm:w-[40%] w-[5%] h-full cursor-pointer fixed top-0 left-0 z-50"></div>
      <div className="fixed left-0 bg-[#fdfeff] dark:bg-[#1a1a1a] xl:w-[35%] lg:w-[45%] md:w-[65%] sm:w-[60%] w-[85%] h-full top-0 bottom-2 shadow-md rounded-r-2xl px-4 py-4 z-50">
        <p onClick={() => setIsOpen(true)} className="absolute -right-5 border-[4px] text-white bg-brand p-2 rounded-full cursor-pointer">
          <RxCross2 className="text-lg" />
        </p>

        <div className="p-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-secandari rounded-2xl py-3 pl-4 pr-10 text-sm text-gray-700 dark:text-gray-50 outline-none"
            />
            <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>

          {loading && <p className="text-center mt-3 text-gray-500">Loading...</p>}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {results.map((p) => (
                <div key={p.id} onClick={() => handleProductClick(p.id)} className="cursor-pointer">
                  <ProductCard
                    product={{
                      id: p.id,
                      title: p.title,
                      price: p.variations[0]?.final_price || 0,
                      oldPrice: p.discount > 0 ? p.variations[0]?.price : null,
                      img: p.images[0]?.image,
                      rating: p.rating || 4,
                      sold: p.sold_count || 0,
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <ul className="flex flex-col items-start space-y-3 mt-6 text-primary-default dark:text-primary-dark font-medium text-lg">
            {categories.map((cat, i) => (
              <li key={i} className="w-full">
                <div onClick={() => toggleCategory(cat.name)} className="flex justify-between items-center cursor-pointer hover:text-brand">
                  <Link to={cat.path} onClick={() => setIsOpen(true)}>
                    {cat.name}
                  </Link>
                  {cat.sub && (
                    <span>{openCategory === cat.name ? <FiChevronDown /> : <FiChevronRight />}</span>
                  )}
                </div>
                {openCategory === cat.name && (
                  <ul className="ml-4 mt-2 space-y-2 text-base text-gray-600 dark:text-gray-300">
                    {cat.sub.map((s, j) => (
                      <li key={j}>
                        <Link to={s.path} onClick={() => setIsOpen(true)} className="hover:text-brand">
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
