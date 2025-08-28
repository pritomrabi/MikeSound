import { useState } from "react";
import { FiAlignLeft } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ProductQuickView from "../Home/ProductQuickView";

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
  const [topRated, setTopRated] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [quickcart, setQuickcart] = useState(false);
  const [priceRange, setPriceRange] = useState(1000);
  const [category, setCategory] = useState("All");
  const itemsPerPage = 4;


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
      <div className="container mx-auto px-4 py-8 dark:bg-[#212020]">
        <div className="flex border-b border-gray-300 mb-6">
          <Link
            to="/"
            className="text-secandari cursor-pointer text-base font-Lato font-normal mb-4 inline-block pr-1 hover:underline duration-300"
          >
            Home
          </Link>
          <h3 className="text-primary text-base font-Lato font-semibold mb-4 inline-block">
            <span className="text-secandari  pr-1">/</span> Shop
          </h3>
        </div>
        <div className="flex">
          {/* Sidebar */}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentItems.map((product) => (
                <Link
                  key={product.id}
                  className="group relative rounded-md shadow-sm  transition overflow-hidden"
                >
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    />
                  </div>
                  <div className=" text-center space-y-1 p-3">
                    <div className="flex justify-center gap-2 text-xs text-primary-default dark:text-primary-dark font-medium font-Lato">
                      {/* Optional sizes */}
                      <span>XS</span>
                      <span>S</span>
                      <span>XL</span>
                    </div>
                    <h3 className="text-sm font-medium text-primary-default dark:text-primary-dark font-Roboto ">
                      {product.title}
                    </h3>
                    <p className="text-md font-bold text-brand font-Monrope">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-yellow-600 text-sm">
                      ⭐ {product.rating}
                    </p>
                  </div>
                  <div className="absolute bottom-32 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                    {/* Add to Cart */}
                    <Link to="/singleproduct" className="relative group/icon">
                      <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                        <AiOutlineShoppingCart />
                      </button>
                      <span className="absolute  bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-Lato font-normal">
                        Add to cart
                      </span>
                    </Link>

                    {/* Search */}
                    <div className="relative group/icon">
                      <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                        <LuSearch onClick={() => setQuickcart(true)} />
                      </button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-Lato font-normal">
                        Search
                      </span>
                    </div>
                  </div>
                  {quickcart && (
                    <ProductQuickView setQuickcart={setQuickcart} />
                  )}
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <ReactPaginate
                breakLabel="..."
                nextLabel={null}
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                previousLabel={null}
                renderOnZeroPageCount={null}
                // Container styling
                containerClassName="flex justify-center items-center space-x-2 mt-4"
                // Page button base styling
                pageClassName="text-primary border border-gray-300 rounded-lg px-3 py-1 transition duration-200 hover:bg-gray-100 cursor-pointer"
                // Active (current page) styling
                activeClassName="bg-yellow-600 text-white hover:text-primary border-blue-500 hover:bg-blue-600"
                breakClassName="text-gray-500 px-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
