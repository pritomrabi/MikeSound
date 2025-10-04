import { useState, useEffect, useMemo } from "react";
import { FiAlignLeft } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ProductQuickView from "../Home/ProductQuickView";
import Filter from "../../Utilities/Filter";
import { getProducts } from "../../api/api";

const ShopPage = () => {
  const categories = ["All", "Headphone", "Speakers", "Earbud", "Gaming"];
  const [products, setProducts] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [quickView, setQuickView] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProducts();
      if (!res.error && res.products) {
        setProducts(res.products);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const price = Number(product.variations?.[0]?.price ?? 0);
      const withinPrice = price >= priceRange[0] && price <= priceRange[1];
      const productCategory = product.subcategory_name || product.category || "All";
      const matchCategory = category === "All" || productCategory.toLowerCase() === category.toLowerCase();
      const matchRating = !topRated || (product.rating ?? 0) >= 4.5;

      return withinPrice && matchCategory && matchRating;
    });
  }, [products, category, topRated]);



  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <section className="dark:bg-[#1b1b1b]">
      <div className="container mx-auto md:px-4 px-2 py-8">
        {/* Breadcrumb */}
        <div className="flex border-b border-gray-300 mb-6">
          <Link
            to="/"
            className="text-secandari hover:text-Green cursor-pointer text-base font-Lato font-normal mb-4 inline-block pr-1 hover:underline duration-300"
          >
            Home
          </Link>
          <h3 className="text-primary dark:text-white text-base font-Lato font-semibold mb-4 inline-block">
            <span className="text-secandari dark:text-white pr-1">/</span> Shop
          </h3>
        </div>

        {/* Sidebar Toggle */}
        <div
          className="flex text-base gap-2 cursor-pointer dark:text-white text-primary font-Lato font-medium items-center mb-4"
          onClick={toggleSidebar}
        >
          <FiAlignLeft />
          <h2>Show sidebar</h2>
        </div>

        {/* Sidebar Filter */}
        <Filter
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          categories={categories}
          topRated={topRated}
          setTopRated={setTopRated}
        />

        {/* Products Grid */}
        {loading ? (
          <p className="text-center py-10 text-white">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center py-10 text-white">
            No products found for this filter
          </p>
        ) : (
          <div className="flex">
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4">
                {currentItems.map((product) => (
                  <div
                    key={product.id}
                    className="group relative rounded-md shadow-sm bg-white dark:bg-[#2a2a2a] transition overflow-hidden"
                  >
                    {product.variations?.[0]?.discount && (
                      <span className="absolute top-2 left-2 bg-brand text-white text-xs w-10 h-10 rounded-full justify-center flex items-center font-Monrope font-normal">
                        -{product.variations[0].discount}%
                      </span>
                    )}
                    <Link to={`/product/${product.id}`}>
                      <div className="relative overflow-hidden rounded-t-md">
                        <img
                          src={
                            product.images?.[0]?.image ||
                            "https://via.placeholder.com/300x300"
                          }
                          alt={product.title}
                          className="w-full h-40 sm:h-68 md:h-64 lg:h-68 object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="text-start space-y-1 p-3">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-sm font-medium text-primary-default dark:text-primary-dark font-Roboto">
                          {product.title.substring(0, 20)}..
                        </h3>
                        <p className="text-md font-bold text-brand font-Monrope">
                          ${Number(product.variations?.[0]?.price ?? 0).toFixed(2)}
                        </p>

                        <p className="text-yellow-600 text-sm flex">
                          {[...Array(Math.floor(product.rating || 0))].map(
                            (_, i) => (
                              <AiFillStar
                                key={i}
                                className="text-yellow-400"
                              />
                            )
                          )}
                          {product.rating % 1 !== 0 && (
                            <AiFillStar className="text-yellow-400 opacity-50" />
                          )}
                        </p>
                      </Link>
                    </div>

                    {/* Quick view & cart */}
                    <div className="absolute top-[25%] right-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition flex flex-col gap-4 bg-white py-2.5 px-3 rounded shadow z-10">
                      <div className="relative group/icon">
                        <button
                          onClick={() => setQuickView(product.id)}
                          className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"
                        >
                          <LuSearch />
                        </button>
                        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">
                          Quick View
                        </span>
                      </div>
                      <div className="relative group/icon">
                        <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer">
                          <IoCartOutline />
                        </button>
                        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100 whitespace-nowrap">
                          Add To Cart
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
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
        )}

        {quickView && (
          <ProductQuickView
            productId={quickView}
            setQuickView={() => setQuickView(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ShopPage;
