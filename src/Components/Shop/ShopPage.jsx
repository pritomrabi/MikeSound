import { useState, useMemo } from "react";
import { FiAlignLeft, FiX } from "react-icons/fi";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ProductQuickView from "../Home/ProductQuickView";
import Filter from "../../Utilities/Filter";

const ShopPage = () => {
  const allProducts = [
    { id: 1, title: "Balai Sports", category: "Blackfriday", price: 269, rating: 4, image: "home.jpg" },
    { id: 2, title: "Nerd wooden chair", category: "Furniture", price: 599, rating: 4, discount: 25, image: "home.jpg" },
    { id: 3, title: "iPhone Dock", category: "Accessories", price: 399, rating: 4, image: "home.jpg" },
    { id: 4, title: "Pendant Light", category: "Lighting", price: 169, rating: 4, image: "home.jpg" },
    { id: 5, title: "Balai Sports 2", category: "Blackfriday", price: 269, rating: 4, image: "home.jpg" },
    { id: 6, title: "Nerd wooden chair 2", category: "Furniture", price: 599, rating: 4, discount: 25, image: "home.jpg" },
    { id: 7, title: "iPhone Dock 2", category: "Accessories", price: 399, rating: 5, image: "home.jpg" },
    { id: 8, title: "Pendant Light 2", category: "Lighting", price: 169, rating: 4, image: "home.jpg" },
  ];

  const categories = ["All", "Blackfriday", "Furniture", "Accessories", "Lighting"];
  const [showSidebar, setShowSidebar] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [quickcart, setQuickcart] = useState(null); // store product instead of boolean
  const [priceRange, setPriceRange] = useState(1000);
  const [category, setCategory] = useState("All");
  const itemsPerPage = 6;

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  // optimized filter with memo
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const withinPrice = Array.isArray(priceRange)
        ? product.price >= priceRange[0] && product.price <= priceRange[1]
        : product.price <= priceRange;
      const matchCategory = category === "All" || product.category === category;
      const matchRating = !topRated || product.rating >= 4.5;
      return withinPrice && matchCategory && matchRating;
    });
  }, [allProducts, priceRange, category, topRated]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <section className="dark:bg-[#1b1b1b]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex border-b border-gray-300 mb-6">
          <Link to="/" className="text-secandari cursor-pointer text-base font-Lato font-normal mb-4 inline-block pr-1 hover:underline duration-300">
            Home
          </Link>
          <h3 className="text-primary dark:text-white text-base font-Lato font-semibold mb-4 inline-block">
            <span className="text-secandari dark:text-white  pr-1">/</span> Shop
          </h3>
        </div>
        <div className="flex text-base gap-2 cursor-pointer dark:text-white text-primary font-Lato font-medium items-center mb-4">
          <FiAlignLeft onClick={toggleSidebar} />
          <h2>Show sidebar</h2>
        </div>
        {showSidebar && (
          <div className=" fixed top-0 left-0 md:block w-full p-4 rounded-md mr-6 z-50 h-full">
            <div className=" dark:bg-[#1b1b1b] fixed w-[90%] sm:w-[80%] md:w-[50%] lg:w-[25%] h-full top-0 left-0 bg-white px-5">
              <div
                onClick={() => setShowSidebar(false)}
                className="text-right my-4 border-b pb-4 border-gray-300 text-base text-primary dark:text-white font-Lato font-medium hover:text-secandari duration-300 cursor-pointer justify-end flex items-center gap-1 px-2"
              >
                <FiX className="text-lg" /> close
              </div>
              <Filter
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
              <div className="mt-6">
                <h4 className="font-normal font-Roboto text-xl text-primary dark:text-white mb-2">Filter by Category</h4>
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center mb-1">
                    <input
                      type="radio"
                      id={cat}
                      name="category"
                      value={cat}
                      checked={category === cat}
                      onChange={() => setCategory(cat)}
                      className="mr-2"
                    />
                    <label className="text-primary dark:text-white text-base font-medium font-Lato" htmlFor={cat}>
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="font-normal font-Roboto text-xl text-primary dark:text-white mb-2">Top Rated</h4>
                <label className="flex items-center">
                  <input type="checkbox" checked={topRated} onChange={() => setTopRated(!topRated)} className="mr-2" />
                  4 stars & up
                </label>
              </div>
            </div>
            <div onClick={() => setShowSidebar(false)} className="fixed w-[10%] sm:w-[20%] md:w-[50%] lg:w-[75%] top-0 right-0 bg-[rgba(0,0,0,0.1)] z-50 h-full cursor-pointer"></div>
          </div>
        )}
        <div className="flex">
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {currentItems.map((product) => (
                <div key={product.id} className="group relative rounded-md shadow-sm bg-white dark:bg-[#2a2a2a] transition overflow-hidden">
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-brand text-white text-xs w-10 h-10 rounded-full justify-center flex items-center font-Monrope font-normal">
                      -{product.discount}%
                    </span>
                  )}
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-52 sm:h-56 object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-start space-y-1 p-3">
                    <Link to="/singleproduct">
                      <h3 className="text-sm font-medium text-primary-default dark:text-primary-dark font-Roboto ">
                        {product.title.substring(0, 20)}..
                      </h3>
                      <p className="text-md font-bold text-brand font-Monrope">${product.price.toFixed(2)}</p>
                      <p className="text-yellow-600 text-sm flex">
                        {[...Array(Math.floor(product.rating))].map((_, i) => (
                          <AiFillStar key={i} className="text-yellow-400" />
                        ))}
                        {product.rating % 1 !== 0 && <AiFillStar className="text-yellow-400 opacity-50" />}
                      </p>
                    </Link>
                  </div>
                  <div className="absolute bottom-32 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                    <Link to="/singleproduct" className="relative group/icon">
                      <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                        <AiOutlineShoppingCart />
                      </button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-Lato font-normal">
                        Add to cart
                      </span>
                    </Link>
                    <div className="relative group/icon">
                      <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer" onClick={() => setQuickcart(product)}>
                        <LuSearch />
                      </button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-Lato font-normal">
                        Search
                      </span>
                    </div>

                    <Link to="/wishlist" className="relative group/icon">
                      <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                        <FaRegHeart />
                      </button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-Lato font-normal">
                        Wishlist
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <ReactPaginate
                breakLabel="..."
                nextLabel=""
                previousLabel=""
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                containerClassName="flex justify-center items-center space-x-2 mt-4"
                pageClassName="text-primary border border-gray-300 rounded-lg px-3 py-1 transition duration-200 hover:bg-gray-100 cursor-pointer"
                activeClassName="bg-yellow-600 text-white border-blue-500"
                breakClassName="text-gray-500 px-2"
              />
            </div>
          </div>
        </div>
      </div>

      {quickcart && <ProductQuickView product={quickcart} setQuickcart={setQuickcart} />}
    </section>
  );
};

export default ShopPage;
