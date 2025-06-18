import { useState } from "react";
import { FiAlignLeft } from "react-icons/fi";
import { FiX } from "react-icons/fi";

import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const allProducts = [
    {
      id: 1,
      title: "Balai Sports",
      category: "Blackfriday",
      price: 269,
      rating: 4.2,
      image: "home.jpg",
    },
    {
      id: 2,
      title: "Nerd wooden chair",
      category: "Furniture",
      price: 599,
      rating: 4.8,
      discount: 25,
      image: "home.jpg",
    },
    {
      id: 3,
      title: "iPhone Dock",
      category: "Accessories",
      price: 399,
      rating: 5.0,
      image: "home.jpg",
    },
    {
      id: 4,
      title: "Pendant Light",
      category: "Lighting",
      price: 169,
      rating: 4.5,
      image: "home.jpg",
    },
    {
      id: 5,
      title: "Balai Sports",
      category: "Blackfriday",
      price: 269,
      rating: 4.2,
      image: "home.jpg",
    },
    {
      id: 6,
      title: "Nerd wooden chair",
      category: "Furniture",
      price: 599,
      rating: 4.8,
      discount: 25,
      image: "home.jpg",
    },
    {
      id: 7,
      title: "iPhone Dock",
      category: "Accessories",
      price: 399,
      rating: 5.0,
      image: "home.jpg",
    },
    {
      id: 8,
      title: "Pendant Light",
      category: "Lighting",
      price: 169,
      rating: 4.5,
      image: "home.jpg",
    },
  ];

  const categories = [
    "All",
    "Blackfriday",
    "Furniture",
    "Accessories",
    "Lighting",
  ];
  const [showSidebar, setShowSidebar] = useState(false);
  const [priceRange, setPriceRange] = useState(1000);
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);
  const [isPriceChanged, setIsPriceChanged] = useState(false);
  const [category, setCategory] = useState("All");
  const [topRated, setTopRated] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const filteredProducts = allProducts.filter((product) => {
    const withinPrice = product.price <= priceRange;
    const matchCategory = category === "All" || product.category === category;
    const matchRating = !topRated || product.rating >= 4.5;
    return withinPrice && matchCategory && matchRating;
  });

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  return (
    <section>
      <div className="container mx-auto px-4 py-8">
        <div className="flex border-b border-gray-300 mb-6">
          <Link
            to="/"
            className="text-secandari cursor-pointer text-base font-Lato font-normal mb-4 inline-block pr-1 hover:underline duration-300"
          >
            Home
          </Link>
          <h3 className="text-primary text-base font-Lato font-semibold mb-4 inline-block">
            <span className="text-secandari pr-1">/</span> Shop
          </h3>
        </div>
        <div className="flex text-base gap-2 cursor-pointer text-primary font-Lato font-medium items-center mb-4">
          <FiAlignLeft onClick={toggleSidebar} />
          <h2 className="">Show sidebar</h2>
        </div>
        {showSidebar && (
          <div className=" fixed top-0 left-0 md:block w-64 p-4 rounded-md mr-6 z-50 h-full">
            <div className="fixed w-[25%] h-full top-0 left-0 bg-white px-5">
              {/* Price Filter */}
              <div
                onClick={() => setShowSidebar(false)}
                className="text-right my-4 border-b pb-4 border-gray-300 text-base text-primary font-Lato font-medium hover:text-secandari duration-300 cursor-pointer justify-end flex items-center gap-1 px-2"
              >
                <FiX className="text-lg" /> close
              </div>
              <div>
                <h4 className="font-normal font-Roboto text-xl text-primary mb-2">
                  Filter by Price
                </h4>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={tempPriceRange}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    setTempPriceRange(newValue);
                    setIsPriceChanged(newValue !== priceRange);
                  }}
                  className="w-full h-1 bg-brand rounded-full appearance-none custom-slider"
                />
                <div className="text-sm text-gray-600">
                  Up to ${tempPriceRange}
                </div>
                <button
                  disabled={!isPriceChanged}
                  onClick={() => {
                    setPriceRange(tempPriceRange);
                    setIsPriceChanged(false);
                  }}
                  className={`mt-2 text-sm px-4 py-1 rounded transition w-full ${
                    isPriceChanged
                      ? "bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  FILTER
                </button>
              </div>

              {/* Category Filter */}
              <div className="mt-6">
                <h4 className="font-normal font-Roboto text-xl text-primary mb-2">
                  Filter by Category
                </h4>
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
                    <label htmlFor={cat}>{cat}</label>
                  </div>
                ))}
              </div>

              {/* Top Rated Filter */}
              <div className="mt-6">
                <h4 className="font-normal font-Roboto text-xl text-primary mb-2">
                  Top Rated
                </h4>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={topRated}
                    onChange={() => setTopRated(!topRated)}
                    className="mr-2"
                  />
                  4.5 stars & up
                </label>
              </div>
            </div>
            <div
              onClick={() => setShowSidebar(false)}
              className="fixed w-[75%] top-0 right-0 bg-[rgba(0,0,0,0.1)] z-50 h-full"
            ></div>
          </div>
        )}
        <div className="flex">
          {/* Sidebar */}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentItems.map((product) => (
                <div
                  key={product.id}
                  className="relative border rounded-md p-4 shadow-sm hover:shadow-lg transition"
                >
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover mb-3"
                  />
                  <h3 className="text-md font-medium">{product.title}</h3>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                  <p className="text-primary font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-yellow-600 text-sm">⭐ {product.rating}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                previousLabel="<"
                containerClassName="flex space-x-2"
                pageClassName="px-3 py-1 border rounded hover:bg-gray-200"
                activeClassName="bg-gray-300"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
